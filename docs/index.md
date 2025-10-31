---
layout: default
title: Home
nav_order: 1
description: "Prompt Muse is an MCP server providing reusable prompt templates for common coding tasks."
permalink: /
---

# Prompt Muse
{: .fs-9 }

An MCP server providing reusable prompt templates for common coding tasks.
{: .fs-6 .fw-300 }

[Get Started](/prompt-muse/getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[View on GitHub](https://github.com/monkey-jeff/prompt-muse){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## What is Prompt Muse?

Prompt Muse is a **Model Context Protocol (MCP) server** that exposes a collection of carefully crafted prompt templates designed to enhance AI-assisted software development. Instead of writing the same prompts repeatedly, use Prompt Muse to access pre-built, tested templates for common coding tasks.

### Key Features

- 🎯 **Ready-to-Use Prompts**: Pre-built templates for debugging, testing, documentation, and more
- 📝 **YAML-Based Configuration**: Easy to customize and extend with simple YAML files
- 🔌 **MCP Compatible**: Works seamlessly with Claude Desktop and other MCP clients
- ✅ **Tested & Validated**: Comprehensive test suite ensures prompt quality
- 🚀 **Easy to Extend**: Add your own custom prompts in minutes

## Available Prompts

| Prompt | Description | Arguments |
|--------|-------------|-----------|
| **debug** | Help debugging issues with structured guidance | error (optional) |
| **explain** | Explain how code works | audience (optional) |
| **document** | Generate comprehensive code documentation | - |
| **add-feature** | Add new features with implementation guidance | feature (required) |
| **branch** | Create git branches with proper naming | workItemId (optional) |
| **commit** | Create git commits following best practices | - |

[View all prompts →](/prompt-muse/prompts/){: .btn .btn-outline }

## Quick Start

```bash
# Install
npm install

# Configure in Claude Desktop
# Add to claude_desktop_config.json:
{
  "mcpServers": {
    "prompt-muse": {
      "command": "node",
      "args": ["/absolute/path/to/prompt-muse/index.js"]
    }
  }
}

# Restart Claude Desktop and start using prompts!
```

[Full installation guide →](/prompt-muse/getting-started)

## Why Use Prompt Muse?

### Consistency
Use battle-tested prompts that produce reliable, high-quality results every time.

### Efficiency
Stop writing the same prompts over and over. Access them with a simple command.

### Customization
Easily modify existing prompts or create new ones to match your workflow.

### Community
Benefit from community-contributed prompts and share your own.

## Project Status

- ✅ Core MCP server implementation
- ✅ 7 built-in prompts
- ✅ Comprehensive test suite (23 tests)
- ✅ CI/CD with GitHub Actions
- ✅ MIT License

## Contributing

We welcome contributions! Whether it's a new prompt, bug fix, or documentation improvement, please check out our [contributing guide](/prompt-muse/contributing).

## License

Prompt Muse is open source software licensed under the [MIT License](https://github.com/monkey-jeff/prompt-muse/blob/main/LICENSE).
