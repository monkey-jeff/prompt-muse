/**
 * @fileoverview Integration tests for prompt loading from YAML files
 * These tests verify that actual prompt files in the prompts/ directory are valid
 */

import { loadPrompts } from '../index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('loadPrompts integration tests', () => {
  test('should load prompts from the prompts directory', () => {
    const prompts = loadPrompts();

    expect(Array.isArray(prompts)).toBe(true);
    expect(prompts.length).toBeGreaterThan(0);
  });

  test('all loaded prompts should have required fields', () => {
    const prompts = loadPrompts();

    prompts.forEach(prompt => {
      expect(prompt).toHaveProperty('name');
      expect(prompt).toHaveProperty('description');
      expect(prompt).toHaveProperty('template');

      expect(typeof prompt.name).toBe('string');
      expect(typeof prompt.description).toBe('string');
      expect(typeof prompt.template).toBe('string');

      expect(prompt.name.length).toBeGreaterThan(0);
      expect(prompt.description.length).toBeGreaterThan(0);
      expect(prompt.template.length).toBeGreaterThan(0);
    });
  });

  test('all prompt names should be unique', () => {
    const prompts = loadPrompts();
    const names = prompts.map(p => p.name);
    const uniqueNames = new Set(names);

    expect(names.length).toBe(uniqueNames.size);
  });

  test('prompts with arguments should have valid argument definitions', () => {
    const prompts = loadPrompts();

    prompts.forEach(prompt => {
      if (prompt.arguments) {
        expect(Array.isArray(prompt.arguments)).toBe(true);

        prompt.arguments.forEach(arg => {
          expect(arg).toHaveProperty('name');
          expect(arg).toHaveProperty('description');
          expect(typeof arg.name).toBe('string');
          expect(typeof arg.description).toBe('string');

          if (arg.required !== undefined) {
            expect(typeof arg.required).toBe('boolean');
          }
        });
      }
    });
  });

  test('should verify specific expected prompts exist', () => {
    const prompts = loadPrompts();
    const promptNames = prompts.map(p => p.name);

    // These prompts should exist based on the current codebase
    const expectedPrompts = ['debug', 'test-cases', 'explain', 'document', 'add-feature'];

    expectedPrompts.forEach(expectedName => {
      expect(promptNames).toContain(expectedName);
    });
  });

  test('template placeholders should match defined arguments', () => {
    const prompts = loadPrompts();

    prompts.forEach(prompt => {
      // Extract placeholder names from template using regex
      const placeholderMatches = prompt.template.matchAll(/\{(\w+)\}/g);
      const placeholders = new Set();

      for (const match of placeholderMatches) {
        placeholders.add(match[1]);
      }

      // If there are placeholders, there should be corresponding arguments
      if (placeholders.size > 0 && prompt.arguments) {
        const argNames = new Set(prompt.arguments.map(a => a.name));

        placeholders.forEach(placeholder => {
          expect(argNames.has(placeholder)).toBe(true);
        });
      }
    });
  });

  test('YAML files in prompts directory should be parseable', async () => {
    const promptsDir = path.join(__dirname, '..', 'prompts');
    const files = fs.readdirSync(promptsDir)
      .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));

    expect(files.length).toBeGreaterThan(0);

    const yaml = await import('js-yaml');

    files.forEach(file => {
      const filePath = path.join(promptsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      // Should not throw an error
      expect(() => {
        yaml.load(content);
      }).not.toThrow();
    });
  });
});

describe('prompt template syntax', () => {
  test('conditional template syntax should be properly formatted', () => {
    const prompts = loadPrompts();

    prompts.forEach(prompt => {
      // Check for balanced conditional tags {arg}...{/arg}
      const template = prompt.template;
      const openTags = (template.match(/\{(\w+)\}(?!\})/g) || []).length;
      const closeTags = (template.match(/\{\/(\w+)\}/g) || []).length;

      // Note: This is a basic check. Opening tags can be used for substitution
      // without closing tags, but closing tags should not exceed opening tags
      expect(closeTags).toBeLessThanOrEqual(openTags);
    });
  });

  test('templates should not have malformed conditional blocks', () => {
    const prompts = loadPrompts();

    prompts.forEach(prompt => {
      const template = prompt.template;

      // Check for orphaned closing tags (closing tag without opening)
      const closingTags = template.matchAll(/\{\/(\w+)\}/g);

      for (const closeMatch of closingTags) {
        const tagName = closeMatch[1];
        const openPattern = new RegExp(`\\{${tagName}\\}`);

        // There should be an opening tag before the closing tag
        const beforeClose = template.substring(0, closeMatch.index);
        expect(beforeClose).toMatch(openPattern);
      }
    });
  });
});
