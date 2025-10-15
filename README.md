# Prompt Muse

An MCP server providing reusable prompt templates for common coding tasks.

## Features

This MCP server provides 15+ ready-to-use prompt templates for:

- **Code Review** - Get thorough code reviews with best practices
- **Refactoring** - Request refactoring suggestions
- **Debugging** - Help debugging issues
- **Test Cases** - Generate comprehensive test cases
- **Optimization** - Optimize code for performance
- **Explanation** - Explain how code works
- **Documentation** - Generate code documentation
- **Feature Addition** - Add new features to existing code
- **Bug Fixing** - Fix specific bugs
- **Security Audit** - Perform security audits
- **Modernization** - Modernize legacy code
- **API Design** - Design or review APIs
- **Database Schema** - Design or review database schemas
- **Error Handling** - Improve error handling
- **Language Conversion** - Convert code between languages

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure in Claude Desktop or other MCP clients by adding to your config file:

For Claude Desktop on macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
For Claude Desktop on Windows: `%APPDATA%\Claude\claude_desktop_config.json`

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

3. Restart Claude Desktop

## Usage

Once configured, you'll see the prompts available in your MCP client. You can invoke them by name and optionally pass arguments.

### Examples

**Basic prompt (no arguments):**
- Use the `code-review` prompt to get a comprehensive code review

**Prompt with optional arguments:**
- Use the `refactor` prompt with `focus: "performance"` to get performance-focused refactoring

**Prompt with required arguments:**
- Use the `add-feature` prompt with `feature: "user authentication"` to add a new feature

## Customizing Prompts

Edit `prompts.js` to add, remove, or modify prompt templates. Each prompt has:

- `name` - Unique identifier
- `description` - What the prompt does
- `template` - The actual prompt text
- `arguments` (optional) - Parameters the prompt accepts

### Example prompt structure:

```javascript
{
  name: "my-prompt",
  description: "What this prompt does",
  arguments: [
    {
      name: "param1",
      description: "Parameter description",
      required: true,
    },
  ],
  template: `Prompt text with {param1} placeholder`,
}
```

## Development

Run the server directly:
```bash
node index.js
```

## License

MIT
