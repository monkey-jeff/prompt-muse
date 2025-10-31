---
layout: default
title: Prompts
nav_order: 3
has_children: true
---

# Available Prompts
{: .no_toc }

Prompt Muse includes 6 built-in prompts for common coding tasks. Each prompt can accept optional arguments to customize behavior.
{: .fs-6 .fw-300 }

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Debug

Help debugging issues with structured guidance and systematic troubleshooting.

**Arguments:**
- `error` (optional): The error message or issue description

**Example Usage:**
```
Use the debug prompt with error: "TypeError: Cannot read property 'name' of undefined"
```

**What it does:**
- Identifies the root cause
- Explains why the issue is happening
- Provides a fix with explanation
- Suggests prevention strategies

[View source](https://github.com/monkey-jeff/prompt-muse/blob/main/prompts/debug.yaml)

---

## Explain

Explain how code works, tailored to your specified audience.

**Arguments:**
- `audience` (optional): Target audience (e.g., 'beginner', 'executive', 'product manager', 'senior developer')

**Example Usage:**
```
Use the explain prompt with audience: "beginner"
```

**What it does:**
- Provides high-level overview
- Step-by-step breakdown
- Explains key concepts and patterns
- Highlights important details and gotchas

[View source](https://github.com/monkey-jeff/prompt-muse/blob/main/prompts/explain.yaml)

---

## Document

Generate comprehensive code documentation in the appropriate format.

**Arguments:** None

**Example Usage:**
```
Use the document prompt
```

**What it does:**
- Creates function/class descriptions
- Documents parameters and return values
- Provides usage examples
- Adds important notes or warnings
- Uses appropriate format (JSDoc, docstrings, etc.)

[View source](https://github.com/monkey-jeff/prompt-muse/blob/main/prompts/document.yaml)

---

## Add Feature

Add new features to existing code with implementation guidance.

**Arguments:**
- `feature` (required): Description of the feature to add

**Example Usage:**
```
Use the add-feature prompt with feature: "user authentication with JWT tokens"
```

**What it does:**
- Suggests implementation approach
- Details code changes needed
- Shows integration with existing code
- Provides testing recommendations
- Notes any breaking changes or migration needs

[View source](https://github.com/monkey-jeff/prompt-muse/blob/main/prompts/add-feature.yaml)

---

## Branch

Create git branches following proper naming conventions.

**Arguments:**
- `workItemId` (optional): Work item or ticket ID (e.g., 'JIRA-123', 'issue-456')

**Example Usage:**
```
Use the branch prompt with workItemId: "JIRA-123"
```

**What it does:**
- Checks current git status
- Suggests appropriate branch name
- Follows naming patterns (feature/, fix/, etc.)
- Incorporates work item ID for traceability
- Creates and switches to the new branch

[View source](https://github.com/monkey-jeff/prompt-muse/blob/main/prompts/branch.yaml)

---

## Commit

Create git commits following best practices and conventional commit format.

**Arguments:** None

**Example Usage:**
```
Use the commit prompt
```

**What it does:**
- Analyzes current git changes
- Writes clear commit messages
- Uses imperative mood
- Includes detailed body if needed
- Stages and commits changes
- Can push to remote if requested

[View source](https://github.com/monkey-jeff/prompt-muse/blob/main/prompts/commit.yaml)

---

## Tips for Using Prompts

### Chaining Prompts

You can use multiple prompts in sequence for complex workflows:

1. Use `branch` to create a feature branch
2. Use `add-feature` to implement the feature
3. Use `document` to add documentation
4. Use `commit` to commit your changes

### Customizing Arguments

Most prompts have optional arguments that let you customize behavior. Experiment with different argument values to get the best results for your use case.

### Creating Custom Prompts

Want to create your own prompts? Check out the [Custom Prompts](/prompt-muse/custom-prompts) guide.
