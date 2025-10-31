# Prompt Muse

An MCP server providing reusable prompt templates for common coding tasks.

## Features

This MCP server provides ready-to-use prompt templates for common coding tasks:

- **Debug** - Help debugging issues with structured guidance
- **Test Cases** - Generate comprehensive test cases for any framework
- **Explain** - Explain how code works, tailored to audience level
- **Document** - Generate comprehensive code documentation
- **Add Feature** - Add new features to existing code with implementation guidance

All prompts are stored as YAML files in the `prompts/` directory for easy customization and extension.

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

## Adding Custom Prompts

Prompts are stored as individual YAML files in the `prompts/` directory. To add a new prompt:

1. Create a new `.yaml` file in the `prompts/` directory
2. Use this structure:

```yaml
# Comment describing the prompt
name: my-prompt           # Unique identifier (required)
description: What this prompt does  # Brief description (required)

# Optional arguments with template variable substitution
arguments:
  - name: param1
    description: Parameter description
    required: true      # or false

# The actual prompt text (required)
# Use {param1} for variable substitution
# Use {param1}conditional text{/param1} for optional text
template: |
  Prompt text with {param1} placeholder
  Multiple lines supported
```

3. Restart the MCP server to load the new prompt

### Template Syntax

- `{variableName}` - Replaced with argument value
- `{variableName}optional text{/variableName}` - Text included only when argument is provided
- Use YAML's `|` for multi-line templates
- Add comments with `#` to document your prompts

### Example: Creating a Code Review Prompt

Create `prompts/code-review.yaml`:

```yaml
# Code Review Prompt
# Provides comprehensive code review feedback

name: code-review
description: Get thorough code review with best practices

arguments:
  - name: focus
    description: Specific focus area (e.g., 'security', 'performance')
    required: false

template: |
  Please review this code{focus} with focus on {focus}{/focus}.

  Provide:
  - Code quality assessment
  - Best practice suggestions
  - Potential bugs or issues
  - Improvement recommendations
```

## Development

Run the server directly:
```bash
node index.js
```

## License

MIT
