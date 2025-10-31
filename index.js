#!/usr/bin/env node

/**
 * @fileoverview Prompt Muse - An MCP server providing reusable prompt templates for common coding tasks.
 * This server implements the Model Context Protocol (MCP) to expose prompt templates that can be
 * used by MCP clients like Claude Desktop.
 *
 * Prompts are loaded dynamically from YAML files in the prompts/ directory.
 *
 * @module prompt-muse
 * @requires @modelcontextprotocol/sdk
 * @requires js-yaml
 * @license MIT
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Validates a prompt object to ensure it has all required fields and correct types.
 *
 * @param {Object} prompt - The prompt object to validate
 * @param {string} filename - The filename being validated (for error messages)
 * @returns {{valid: boolean, errors: Array<string>}} Validation result
 *
 * @example
 * validatePrompt({ name: "test", description: "...", template: "..." }, "test.yaml")
 * // Returns: { valid: true, errors: [] }
 */
function validatePrompt(prompt, filename) {
  const errors = [];

  // Check required fields
  if (!prompt.name || typeof prompt.name !== "string") {
    errors.push("Missing or invalid 'name' field (must be a string)");
  }

  if (!prompt.description || typeof prompt.description !== "string") {
    errors.push("Missing or invalid 'description' field (must be a string)");
  }

  if (!prompt.template || typeof prompt.template !== "string") {
    errors.push("Missing or invalid 'template' field (must be a string)");
  }

  // Validate arguments if present
  if (prompt.arguments !== undefined) {
    if (!Array.isArray(prompt.arguments)) {
      errors.push("'arguments' must be an array");
    } else {
      prompt.arguments.forEach((arg, index) => {
        if (!arg.name || typeof arg.name !== "string") {
          errors.push(`Argument ${index}: missing or invalid 'name' field`);
        }
        if (!arg.description || typeof arg.description !== "string") {
          errors.push(`Argument ${index}: missing or invalid 'description' field`);
        }
        if (arg.required !== undefined && typeof arg.required !== "boolean") {
          errors.push(`Argument ${index}: 'required' must be a boolean`);
        }
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Loads all prompt templates from YAML files in the prompts directory.
 *
 * @returns {Array<Object>} Array of prompt objects loaded from YAML files
 * @throws {Error} If prompts directory doesn't exist or YAML parsing fails
 *
 * @example
 * // Returns:
 * // [
 * //   { name: "debug", description: "Help debug an issue", arguments: [...], template: "..." },
 * //   { name: "explain", ... }
 * // ]
 */
function loadPrompts() {
  const promptsDir = path.join(__dirname, "prompts");

  if (!fs.existsSync(promptsDir)) {
    throw new Error(`Prompts directory not found: ${promptsDir}`);
  }

  const files = fs.readdirSync(promptsDir).filter(file =>
    file.endsWith(".yaml") || file.endsWith(".yml")
  );

  if (files.length === 0) {
    console.error(`Warning: No YAML files found in ${promptsDir}`);
  }

  const prompts = [];
  const seenNames = new Set();

  for (const file of files) {
    try {
      const filePath = path.join(promptsDir, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const prompt = yaml.load(fileContents);

      // Validate the prompt
      const validation = validatePrompt(prompt, file);
      if (!validation.valid) {
        console.error(`Warning: Skipping invalid prompt file ${file}:`);
        validation.errors.forEach(err => console.error(`  - ${err}`));
        continue;
      }

      // Check for duplicate names
      if (seenNames.has(prompt.name)) {
        console.error(`Warning: Duplicate prompt name "${prompt.name}" in ${file}, skipping`);
        continue;
      }

      seenNames.add(prompt.name);
      prompts.push(prompt);
    } catch (error) {
      console.error(`Error loading prompt file ${file}:`, error.message);
    }
  }

  console.error(`Loaded ${prompts.length} prompt(s) from ${promptsDir}`);
  return prompts;
}

/**
 * Array of loaded prompt templates.
 * @type {Array<Object>}
 */
const prompts = loadPrompts();

/**
 * MCP server instance for Prompt Muse.
 * Configured with stdio transport capabilities for prompt management.
 *
 * @type {Server}
 * @constant
 */
const server = new Server(
  {
    name: "prompt-muse",
    version: "1.0.0",
  },
  {
    capabilities: {
      prompts: {},
    },
  }
);

/**
 * Handles requests to list all available prompts.
 * Returns metadata for each prompt including name, description, and argument definitions.
 *
 * @async
 * @function
 * @returns {Promise<{prompts: Array<{name: string, description: string, arguments: Array}>}>}
 *          Promise resolving to an object containing an array of prompt metadata
 *
 * @example
 * // Response format:
 * {
 *   prompts: [
 *     {
 *       name: "debug",
 *       description: "Help debug an issue",
 *       arguments: [{ name: "error", description: "The error message", required: false }]
 *     }
 *   ]
 * }
 */
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: prompts.map(p => ({
      name: p.name,
      description: p.description,
      arguments: p.arguments || [],
    })),
  };
});

/**
 * Handles requests to retrieve a specific prompt with argument substitution.
 * Performs template variable replacement using provided arguments.
 *
 * Template syntax:
 * - {variableName} - Basic placeholder replacement
 * - {variableName}conditional text{/variableName} - Conditional text (removed if argument not provided)
 *
 * @async
 * @function
 * @param {Object} request - The MCP request object
 * @param {Object} request.params - Request parameters
 * @param {string} request.params.name - Name of the prompt to retrieve
 * @param {Object} [request.params.arguments] - Key-value pairs for template substitution
 *
 * @returns {Promise<{messages: Array<{role: string, content: {type: string, text: string}}>}>}
 *          Promise resolving to a message object containing the processed prompt text
 *
 * @throws {Error} If the requested prompt name is not found
 *
 * @example
 * // Request:
 * {
 *   params: {
 *     name: "debug",
 *     arguments: { error: "TypeError: undefined is not a function" }
 *   }
 * }
 *
 * // Response:
 * {
 *   messages: [{
 *     role: "user",
 *     content: {
 *       type: "text",
 *       text: "I'm encountering TypeError: undefined is not a function. Please help me debug..."
 *     }
 *   }]
 * }
 */
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const promptName = request.params.name;
  const prompt = prompts.find(p => p.name === promptName);

  if (!prompt) {
    throw new Error(`Prompt not found: ${promptName}`);
  }

  // Replace argument placeholders with actual values
  let promptText = prompt.template;

  // First, handle conditional blocks {key}...{/key}
  // If argument is provided, keep the content and substitute {key} with value
  // If argument is not provided, remove the entire block
  const conditionalRegex = /\{(\w+)\}([\s\S]*?)\{\/\1\}/g;
  promptText = promptText.replace(conditionalRegex, (match, key, content) => {
    if (request.params.arguments && request.params.arguments[key]) {
      // Argument provided: keep content and substitute placeholders within it
      return content.replace(new RegExp(`\\{${key}\\}`, 'g'), request.params.arguments[key]);
    } else {
      // Argument not provided: remove entire conditional block
      return '';
    }
  });

  // Then, handle simple placeholders {key} outside of conditional blocks
  if (request.params.arguments) {
    for (const [key, value] of Object.entries(request.params.arguments)) {
      promptText = promptText.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
  }

  return {
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: promptText,
        },
      },
    ],
  };
});

/**
 * Initializes and starts the MCP server.
 * Sets up stdio transport for communication with MCP clients.
 *
 * The server uses standard input/output for communication, making it suitable
 * for process-based MCP client integrations (e.g., Claude Desktop).
 *
 * @async
 * @function main
 * @returns {Promise<void>} Promise that resolves when the server is successfully started
 *
 * @throws {Error} If server initialization or connection fails
 *
 * @example
 * // Server is typically started via:
 * // node index.js
 * //
 * // Or configured in MCP client config:
 * // {
 * //   "mcpServers": {
 * //     "prompt-muse": {
 * //       "command": "node",
 * //       "args": ["/path/to/prompt-muse/index.js"]
 * //     }
 * //   }
 * // }
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Prompt Muse server running on stdio");
}

// Start the server and handle any fatal errors
// Only start the server if this file is being run directly (not imported for testing)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
  });
}

// Export functions for testing
export { validatePrompt, loadPrompts };
