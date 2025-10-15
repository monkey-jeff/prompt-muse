# Prompt Templates

This directory contains YAML files that define prompt templates for Prompt Muse.

## File Structure

Each YAML file represents a single prompt template with the following structure:

```yaml
# Comment describing the prompt's purpose
name: prompt-name         # Unique identifier (required)
description: Brief description shown to users  # (required)

# Optional arguments for template variables
arguments:
  - name: argName
    description: What this argument does
    required: true        # Set to false for optional arguments

# The prompt template text (required)
template: |
  Your prompt text here.
  Use {argName} to insert argument values.
  Use {argName}conditional text{/argName} to include text only when the argument is provided.
```

## Required Fields

- `name` (string) - Unique identifier for the prompt
- `description` (string) - Brief description shown to users
- `template` (string) - The prompt text

## Optional Fields

- `arguments` (array) - List of arguments the prompt accepts
  - Each argument has: `name`, `description`, and optional `required` (boolean)

## Template Syntax

### Variable Substitution
Use `{variableName}` to insert argument values:
```yaml
template: |
  Please help debug this {error}.
```

### Conditional Text
Use `{variableName}conditional text{/variableName}` to include text only when an argument is provided:
```yaml
template: |
  Debug this code{error} for error: {error}{/error}.
```
- If `error` is provided: "Debug this code for error: TypeError."
- If `error` is not provided: "Debug this code."

### Multi-line Templates
Use YAML's `|` for multi-line templates (preserves line breaks):
```yaml
template: |
  Line 1
  Line 2
  Line 3
```

## Validation

The server validates prompts on startup:
- Checks all required fields are present
- Validates field types (strings, arrays, booleans)
- Detects duplicate prompt names
- Reports errors to stderr

Invalid prompts are skipped with detailed error messages.

## Adding a New Prompt

1. Create a new `.yaml` file in this directory
2. Use the template structure above
3. Add helpful comments explaining the prompt's purpose
4. Restart the MCP server to load your prompt

## Examples

See existing prompt files in this directory:
- `debug.yaml` - Simple prompt with optional argument
- `add-feature.yaml` - Prompt with required argument
- `document.yaml` - Prompt with no arguments

## Contributing

When adding new prompts:
- Use descriptive, kebab-case names (e.g., `code-review.yaml`)
- Add comments explaining the prompt's purpose and use cases
- Test your prompt before submitting
- Keep templates clear and focused on a single task
