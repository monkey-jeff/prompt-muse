/**
 * @fileoverview Unit tests for prompt validation functionality
 */

import { validatePrompt } from '../index.js';

describe('validatePrompt', () => {
  describe('valid prompts', () => {
    test('should validate a minimal valid prompt', () => {
      const prompt = {
        name: 'test-prompt',
        description: 'A test prompt',
        template: 'Test template'
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    test('should validate a prompt with arguments', () => {
      const prompt = {
        name: 'test-prompt',
        description: 'A test prompt',
        template: 'Test template with {arg1}',
        arguments: [
          {
            name: 'arg1',
            description: 'First argument',
            required: true
          },
          {
            name: 'arg2',
            description: 'Second argument',
            required: false
          }
        ]
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    test('should validate a prompt with optional arguments field', () => {
      const prompt = {
        name: 'test-prompt',
        description: 'A test prompt',
        template: 'Test template',
        arguments: []
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });

  describe('invalid prompts - missing fields', () => {
    test('should invalidate prompt without name', () => {
      const prompt = {
        description: 'A test prompt',
        template: 'Test template'
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing or invalid 'name' field (must be a string)");
    });

    test('should invalidate prompt without description', () => {
      const prompt = {
        name: 'test-prompt',
        template: 'Test template'
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing or invalid 'description' field (must be a string)");
    });

    test('should invalidate prompt without template', () => {
      const prompt = {
        name: 'test-prompt',
        description: 'A test prompt'
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing or invalid 'template' field (must be a string)");
    });

    test('should invalidate prompt missing all required fields', () => {
      const prompt = {};

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(3);
    });
  });

  describe('invalid prompts - wrong types', () => {
    test('should invalidate prompt with non-string name', () => {
      const prompt = {
        name: 123,
        description: 'A test prompt',
        template: 'Test template'
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing or invalid 'name' field (must be a string)");
    });

    test('should invalidate prompt with empty string name', () => {
      const prompt = {
        name: '',
        description: 'A test prompt',
        template: 'Test template'
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing or invalid 'name' field (must be a string)");
    });

    test('should invalidate prompt with non-array arguments', () => {
      const prompt = {
        name: 'test-prompt',
        description: 'A test prompt',
        template: 'Test template',
        arguments: 'not-an-array'
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("'arguments' must be an array");
    });
  });

  describe('invalid prompts - malformed arguments', () => {
    test('should invalidate argument without name', () => {
      const prompt = {
        name: 'test-prompt',
        description: 'A test prompt',
        template: 'Test template',
        arguments: [
          {
            description: 'An argument',
            required: true
          }
        ]
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Argument 0: missing or invalid 'name' field");
    });

    test('should invalidate argument without description', () => {
      const prompt = {
        name: 'test-prompt',
        description: 'A test prompt',
        template: 'Test template',
        arguments: [
          {
            name: 'arg1',
            required: true
          }
        ]
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Argument 0: missing or invalid 'description' field");
    });

    test('should invalidate argument with non-boolean required field', () => {
      const prompt = {
        name: 'test-prompt',
        description: 'A test prompt',
        template: 'Test template',
        arguments: [
          {
            name: 'arg1',
            description: 'An argument',
            required: 'yes'
          }
        ]
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Argument 0: 'required' must be a boolean");
    });

    test('should validate multiple errors in arguments', () => {
      const prompt = {
        name: 'test-prompt',
        description: 'A test prompt',
        template: 'Test template',
        arguments: [
          {
            // Missing name and description
            required: 'invalid'
          },
          {
            name: 'arg2',
            // Missing description
          }
        ]
      };

      const result = validatePrompt(prompt, 'test.yaml');

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain("Argument 0: missing or invalid 'name' field");
      expect(result.errors).toContain("Argument 0: missing or invalid 'description' field");
      expect(result.errors).toContain("Argument 1: missing or invalid 'description' field");
    });
  });
});
