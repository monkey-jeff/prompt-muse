---
layout: default
title: Contributing
nav_order: 5
---

# Contributing to Prompt Muse
{: .no_toc }

We welcome contributions! This guide will help you get started.
{: .fs-6 .fw-300 }

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Ways to Contribute

There are many ways to contribute to Prompt Muse:

- 🐛 **Report bugs** - Found a bug? Let us know!
- 💡 **Suggest features** - Have an idea? We'd love to hear it
- 📝 **Improve documentation** - Help make our docs better
- 🎯 **Add new prompts** - Share your useful prompt templates
- 🧪 **Write tests** - Help improve code quality
- 🔧 **Fix issues** - Tackle open issues

## Getting Started

### 1. Fork and Clone

Fork the repository on GitHub and clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/prompt-muse.git
cd prompt-muse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

Create a feature branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

## Contributing Prompts

Adding a new prompt is the easiest way to contribute!

### Steps

1. Create a new YAML file in `prompts/`:

```bash
touch prompts/your-prompt-name.yaml
```

2. Follow the [prompt structure](/prompt-muse/custom-prompts):

```yaml
name: your-prompt-name
description: Brief description
arguments:
  - name: arg1
    description: What this argument does
    required: false
template: |
  Your prompt template here
```

3. Test your prompt:

```bash
node index.js
# Check for validation errors
```

4. Add tests if applicable
5. Submit a pull request

### Prompt Quality Guidelines

Good prompts should:

- **Be clear and specific** - Users should understand what the prompt does
- **Have a single purpose** - Do one thing well
- **Use good defaults** - Work well without arguments
- **Be well-documented** - Include helpful descriptions
- **Handle edge cases** - Consider different scenarios

## Contributing Code

### Running Tests

Always run tests before submitting:

```bash
npm test
```

### Code Style

- Use ES modules (`import`/`export`)
- Follow existing code formatting
- Add JSDoc comments for functions
- Keep functions focused and small

### Writing Tests

Add tests for new functionality:

```javascript
// tests/your-feature.test.js
import { yourFunction } from '../index.js';

describe('yourFunction', () => {
  test('should do something', () => {
    const result = yourFunction();
    expect(result).toBe(expected);
  });
});
```

## Improving Documentation

Documentation lives in the `docs/` directory. To work on docs locally:

### Install Jekyll (optional)

```bash
gem install bundler jekyll
cd docs
bundle install
```

### Run Local Server

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000/prompt-muse` to preview changes.

### Documentation Guidelines

- Write clear, concise content
- Include code examples
- Use proper Markdown formatting
- Check for broken links

## Submitting Changes

### Pull Request Process

1. **Test your changes** - Ensure all tests pass
2. **Update documentation** - Document new features
3. **Commit with clear messages** - Follow commit conventions
4. **Push to your fork** - Push your branch
5. **Open a pull request** - Submit PR on GitHub

### Commit Message Format

Follow conventional commits:

```
type: brief description

Detailed explanation if needed

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`

Examples:
- `feat: add code review prompt`
- `fix: handle missing arguments correctly`
- `docs: update installation guide`

### Pull Request Guidelines

- **One feature per PR** - Keep PRs focused
- **Link related issues** - Reference issue numbers
- **Update tests** - Add/update tests for changes
- **Update docs** - Keep documentation current
- **Respond to feedback** - Address review comments

## Code of Conduct

Be respectful and inclusive. We follow these principles:

- Be welcoming and friendly
- Be patient and respectful
- Assume good intentions
- Focus on what's best for the community

## Getting Help

Need help contributing?

- 💬 [GitHub Discussions](https://github.com/monkey-jeff/prompt-muse/discussions)
- 🐛 [Open an Issue](https://github.com/monkey-jeff/prompt-muse/issues)
- 📧 Contact maintainers

## Recognition

All contributors are recognized in our:

- README contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Prompt Muse! 🎉
