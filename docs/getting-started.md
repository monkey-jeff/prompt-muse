---
layout: default
title: Getting Started
nav_order: 2
---

# Getting Started
{: .no_toc }

Get up and running with Prompt Muse in minutes.
{: .fs-6 .fw-300 }

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Prerequisites

Before installing Prompt Muse, ensure you have:

- **Node.js** 18.x or higher
- **npm** (comes with Node.js)
- **Claude Desktop** or another MCP-compatible client

## Installation

### Step 1: Clone or Download

Clone the repository:

```bash
git clone https://github.com/monkey-jeff/prompt-muse.git
cd prompt-muse
```

Or download the latest release from [GitHub Releases](https://github.com/monkey-jeff/prompt-muse/releases).

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Test the Server

Verify the server runs correctly:

```bash
node index.js
```

You should see:
```
Loaded 7 prompt(s) from /path/to/prompt-muse/prompts
Prompt Muse server running on stdio
```

Press `Ctrl+C` to stop the server.

## Configuration

### Claude Desktop

Configure Prompt Muse in Claude Desktop's MCP configuration file:

**macOS:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

Add the following configuration (replace `/absolute/path/to/prompt-muse` with your actual path):

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

{: .warning }
> **Important**: You must use an absolute path. Relative paths and `~` will not work.

### Restart Claude Desktop

After updating the configuration:

1. Quit Claude Desktop completely
2. Restart Claude Desktop
3. The prompts should now be available in the MCP prompts menu

## Verify Installation

To verify Prompt Muse is working:

1. Open Claude Desktop
2. Look for the prompts icon or MCP menu
3. You should see prompts like "debug", "explain", "document", "branch", "commit", etc.
4. Try using a prompt (e.g., "explain" on some code)

## Next Steps

- [Learn about available prompts](/prompt-muse/prompts/)
- [Create your own custom prompts](/prompt-muse/custom-prompts)
- [Understand prompt template syntax](/prompt-muse/template-syntax)

## Troubleshooting

### Prompts Not Showing Up

**Check the logs:**
- Claude Desktop outputs MCP server logs
- Look for errors related to prompt-muse

**Common issues:**
1. **Wrong path**: Ensure you're using an absolute path
2. **Node.js not found**: Ensure Node.js is in your PATH
3. **Dependencies not installed**: Run `npm install` again
4. **Invalid YAML**: Check that all prompt files in `prompts/` are valid YAML

### Server Not Starting

Run the server manually to see errors:

```bash
node index.js
```

Check for:
- Missing dependencies
- Invalid prompt YAML files
- Node.js version issues

### Getting Help

If you're still having issues:

1. Check [GitHub Issues](https://github.com/monkey-jeff/prompt-muse/issues)
2. Review [FAQ](/prompt-muse/faq)
3. [Open a new issue](https://github.com/monkey-jeff/prompt-muse/issues/new)
