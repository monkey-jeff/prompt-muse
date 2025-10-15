# Prompt Muse Documentation

This directory contains the Jekyll-based documentation site for Prompt Muse.

## Local Development

To run the documentation site locally:

### Prerequisites

- Ruby 3.x or higher
- Bundler

### Setup

```bash
cd docs
bundle install
```

### Run Local Server

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000/prompt-muse` to view the site.

### Live Reload

Jekyll watches for file changes and rebuilds automatically. Refresh your browser to see updates.

## Structure

```
docs/
├── _config.yml           # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── index.md             # Home page
├── getting-started.md   # Installation guide
├── prompts.md           # Prompts reference
├── custom-prompts.md    # Creating custom prompts
└── contributing.md      # Contributing guide
```

## Adding Pages

1. Create a new `.md` file in `docs/`
2. Add front matter:

```yaml
---
layout: default
title: Page Title
nav_order: 6
---
```

3. Write content in Markdown
4. Jekyll will automatically add it to the navigation

## Deployment

Documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

The deployment workflow is defined in `.github/workflows/deploy-docs.yml`.

## Theme

We use the [just-the-docs](https://just-the-docs.com/) theme, which provides:

- Clean, responsive design
- Built-in search
- Navigation sidebar
- Mobile-friendly layout
- Syntax highlighting

## Customization

Edit `_config.yml` to customize:

- Site title and description
- Color scheme
- Navigation settings
- Footer content
- And more

See the [just-the-docs documentation](https://just-the-docs.com/) for full customization options.
