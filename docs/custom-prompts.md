---
layout: default
title: Custom Prompts
nav_order: 4
---

# Creating Custom Prompts
{: .no_toc }

Learn how to create your own custom prompt templates.
{: .fs-6 .fw-300 }

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Prompts in Prompt Muse are stored as individual YAML files in the `prompts/` directory. Each prompt follows a simple schema that defines its name, description, arguments, and template.

## Basic Structure

Create a new `.yaml` file in the `prompts/` directory:

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
template: |
  Prompt text with {param1} placeholder
  Multiple lines supported
```

## Required Fields

Every prompt must have:

1. **name** (string): Unique identifier for the prompt
2. **description** (string): Brief description shown to users
3. **template** (string): The actual prompt text

## Template Syntax

### Variable Substitution

Use curly braces to create placeholders:

```yaml
template: |
  Please help me with {taskName}.
```

### Conditional Text

Include text only when an argument is provided:

```yaml
template: |
  Please review this code{focus} with focus on {focus}{/focus}.
```

- `{focus}` - Opens conditional block
- `{/focus}` - Closes conditional block

If `focus` argument is provided, the text between tags is included. If not, it's omitted.

### Multi-line Templates

Use YAML's `|` for multi-line templates:

```yaml
template: |
  Line 1
  Line 2
  Line 3
```

## Example: Code Review Prompt

Let's create a comprehensive code review prompt:

**File:** `prompts/code-review.yaml`

```yaml
# Code Review Prompt
# Provides thorough code review with best practices

name: code-review
description: Get comprehensive code review with best practices

arguments:
  - name: focus
    description: Specific focus area (e.g., 'security', 'performance', 'readability')
    required: false
  - name: style
    description: Coding style guide to follow (e.g., 'Airbnb', 'Google')
    required: false

template: |
  Please review this code{focus} with special focus on {focus}{/focus}{style} following the {style} style guide{/style}.

  Provide:
  1. **Code Quality Assessment**
     - Overall code quality rating
     - Strengths and weaknesses

  2. **Best Practices**
     - Which best practices are followed
     - Which are violated or missing

  3. **Potential Issues**
     - Bugs or logical errors
     - Edge cases not handled
     - Performance concerns
     - Security vulnerabilities

  4. **Suggestions**
     - Specific improvements with code examples
     - Refactoring opportunities
     - Better patterns or approaches

  5. **Positive Feedback**
     - What was done well
     - Good patterns or techniques used
```

## Validation

When you add a new prompt, the server validates it on startup. Common validation errors:

- Missing required fields (name, description, template)
- Duplicate prompt names
- Invalid argument definitions
- Mismatched template placeholders

Check server logs for validation errors:

```bash
node index.js
```

## Testing Your Prompt

After creating a prompt:

1. Restart the MCP server
2. Check server logs for validation errors
3. Try using the prompt in your MCP client
4. Test with and without optional arguments
5. Verify conditional text works as expected

## Best Practices

### 1. Clear Descriptions

Write clear, concise descriptions that explain what the prompt does:

```yaml
# Good
description: Generate unit tests for any testing framework

# Not as good
description: Tests
```

### 2. Descriptive Argument Names

Use clear argument names that indicate their purpose:

```yaml
arguments:
  - name: framework        # Good
  - name: f               # Avoid single letters
```

### 3. Provide Argument Descriptions

Always describe what each argument does:

```yaml
arguments:
  - name: framework
    description: Testing framework to use (e.g., 'Jest', 'Mocha', 'pytest')
```

### 4. Use Optional Arguments Wisely

Make arguments optional when they provide customization but aren't strictly necessary:

```yaml
arguments:
  - name: audience
    description: Target audience level
    required: false    # Prompt works with or without this
```

### 5. Structure Complex Templates

For long templates, use clear sections:

```yaml
template: |
  ## Overview
  {introduction text}

  ## Steps
  1. First step
  2. Second step

  ## Expected Output
  {what to expect}
```

### 6. Add Comments

Document your prompts with YAML comments:

```yaml
# This prompt helps with database schema design
# It considers normalization, indexing, and performance
name: database-schema
```

## Advanced Patterns

### Multiple Conditionals

```yaml
template: |
  Analyze this code{language} written in {language}{/language}.

  Focus areas:
  {performance}- Performance optimization{/performance}
  {security}- Security vulnerabilities{/security}
  {readability}- Code readability{/readability}
```

### Nested Context

```yaml
template: |
  {detailed}Please provide a detailed analysis including:
  - Code metrics
  - Complexity analysis
  - Maintainability index{/detailed}
  {detailed}

{/detailed}{quick}Provide a quick review focusing on major issues only.{/quick}
```

## Sharing Your Prompts

Consider contributing your prompts back to the community:

1. Test your prompt thoroughly
2. Document it well
3. Submit a pull request on [GitHub](https://github.com/monkey-jeff/prompt-muse)

See the [Contributing Guide](/prompt-muse/contributing) for details.

## Examples Gallery

Check out the [built-in prompts](https://github.com/monkey-jeff/prompt-muse/tree/main/prompts) for more examples and inspiration.
