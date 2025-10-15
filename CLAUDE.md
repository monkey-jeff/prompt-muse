# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prompt Muse is an MCP (Model Context Protocol) server that provides reusable prompt templates for common coding tasks. It exposes prompts through the MCP protocol that can be used by MCP clients like Claude Desktop.

## Architecture

**Core Components:**

- `index.js` - MCP server implementation using `@modelcontextprotocol/sdk`
  - Sets up stdio transport for communication
  - Implements two MCP request handlers:
    - `ListPromptsRequestSchema` - Returns all available prompts
    - `GetPromptRequestSchema` - Returns a specific prompt with argument substitution
  - Handles template variable replacement using `{variableName}` placeholders

- `prompts.js` - Prompt template definitions
  - Exports array of prompt objects with: `name`, `description`, `arguments`, `template`
  - Template syntax uses `{argName}conditional text{/argName}` for optional text based on argument presence
  - Currently includes 5 prompts (debug, test-cases, explain, document, add-feature) but README mentions 15+

**Key Design Patterns:**

- The server uses regex-based template substitution (`\{${key}\}`) to replace argument placeholders
- Prompts support both required and optional arguments
- The server runs as a stdio-based process (no HTTP/network layer)

## Development Commands

**Running the server:**
```bash
node index.js
```

**Installing dependencies:**
```bash
npm install
```

**Starting the server (via npm):**
```bash
npm start
```

## Adding/Modifying Prompts

To add a new prompt, edit `prompts.js` and add an object to the `prompts` array:

```javascript
{
  name: "unique-name",           // Used to invoke the prompt
  description: "What it does",   // Shown to users
  arguments: [                   // Optional
    {
      name: "argName",
      description: "What this arg does",
      required: true|false,
    },
  ],
  template: `Prompt text with {argName} substitution`,
}
```

**Template conditionals:** Use `{argName}text here{/argName}` to include text only when an argument is provided.

## Configuration for MCP Clients

The server must be configured in the MCP client's config file with the absolute path to `index.js`:

**Claude Desktop:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "prompt-muse": {
      "command": "node",
      "args": ["/absolute/path/to/prompt-muse/index.js"]
    }
  }
}
```

## Important Notes

- This is an ES module project (`"type": "module"` in package.json)
- The server outputs status to stderr (line 69: `console.error()`)
- There's a discrepancy: README claims 15+ prompts but `prompts.js` only has 5 defined
- No test suite is currently present in the repository
