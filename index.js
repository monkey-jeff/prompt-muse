#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { prompts } from "./prompts.js";

// Create MCP server
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

// Handle prompt listing
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: prompts.map(p => ({
      name: p.name,
      description: p.description,
      arguments: p.arguments || [],
    })),
  };
});

// Handle prompt retrieval
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const promptName = request.params.name;
  const prompt = prompts.find(p => p.name === promptName);

  if (!prompt) {
    throw new Error(`Prompt not found: ${promptName}`);
  }

  // Replace argument placeholders with actual values
  let promptText = prompt.template;
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

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Prompt Muse server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
