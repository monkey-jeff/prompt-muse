# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prompt Muse is an MCP (Model Context Protocol) server that provides reusable prompt templates for common coding tasks. It exposes prompts through the MCP protocol that can be used by MCP clients like Claude Desktop.

## Architecture

**Core Components:**

- `index.js` - MCP server implementation using `@modelcontextprotocol/sdk`
  - Sets up stdio transport for communication
  - Dynamically loads prompts from YAML files in `prompts/` directory at startup
  - Implements two MCP request handlers:
    - `ListPromptsRequestSchema` - Returns all available prompts
    - `GetPromptRequestSchema` - Returns a specific prompt with argument substitution
  - Handles template variable replacement using `{variableName}` placeholders
  - Includes validation to ensure prompt schema compliance

- `prompts/` directory - Individual YAML files for each prompt template
  - Each file defines: `name`, `description`, `arguments`, `template`
  - Template syntax uses `{argName}conditional text{/argName}` for optional text
  - Inline YAML comments document each prompt
  - Currently includes 5 prompts: debug, test-cases, explain, document, add-feature

**Key Design Patterns:**

- YAML-based configuration for easy prompt management and community contributions
- The server uses regex-based template substitution (`\{${key}\}`) to replace argument placeholders
- Prompts support both required and optional arguments
- Schema validation ensures all prompts have required fields before loading
- Duplicate prompt name detection prevents conflicts
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

Prompts are stored as individual YAML files in the `prompts/` directory. To add a new prompt:

1. Create a new `.yaml` file in `prompts/`
2. Follow this structure:

```yaml
# Descriptive comment
name: unique-name           # Used to invoke the prompt (required)
description: What it does   # Shown to users (required)

arguments:                  # Optional
  - name: argName
    description: What this arg does
    required: true          # or false

template: |                 # Required
  Prompt text with {argName} substitution
  Multiple lines supported
```

**Template syntax:**
- `{argName}` - Basic variable substitution
- `{argName}text here{/argName}` - Conditional text (included only when argument is provided)
- Use YAML's `|` for multi-line templates
- Comments with `#` are encouraged for documentation

**Validation:** The server validates all prompts on startup and will skip any invalid files with error messages to stderr.

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

## Testing

The project includes comprehensive unit and integration tests using Jest.

**Running tests:**
```bash
npm test                  # Run all tests
npm run test:watch       # Watch mode for development
npm run test:coverage    # Generate coverage report
```

**Test Files:**
- `tests/prompt-validation.test.js` - Unit tests for prompt validation logic
- `tests/prompt-loading.test.js` - Integration tests for loading actual prompt files
- `tests/README.md` - Detailed testing documentation

**What's Tested:**
- Prompt schema validation (required fields, types, arguments)
- YAML file loading and parsing
- Duplicate prompt name detection
- Template placeholder verification
- Conditional template syntax validation

**Coverage:**
- Core functions: `validatePrompt()`, `loadPrompts()`
- Current test count: 23 tests, 2 test suites

**Continuous Integration:**
- GitHub Actions workflow runs tests on all PRs and pushes to main
- Tests run on Node.js 18.x, 20.x, and 22.x
- Coverage reports generated automatically

## Important Notes

- This is an ES module project (`"type": "module"` in package.json)
- The server outputs status and errors to stderr for MCP compatibility
- Prompts are loaded dynamically at startup - server restart required for prompt changes
- The `js-yaml` library is used for YAML parsing
- Currently includes 7 prompts: debug, test-cases, explain, document, add-feature, branch, commit
- Prompt validation includes: required field checks, type validation, and duplicate name detection
- Exported functions (`validatePrompt`, `loadPrompts`) are available for testing

## Dependencies

**Production:**
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `js-yaml` - YAML file parsing for prompt templates

**Development:**
- `jest` - Testing framework
- `@types/jest` - TypeScript definitions for Jest
