# Prompt Muse Test Suite

This directory contains unit and integration tests for the Prompt Muse MCP server.

## Test Structure

### `prompt-validation.test.js`
Unit tests for the `validatePrompt()` function that ensures prompt YAML files conform to the required schema.

**Test Coverage:**
- Valid prompts with minimal fields
- Valid prompts with arguments
- Invalid prompts missing required fields (name, description, template)
- Invalid prompts with wrong field types
- Malformed argument definitions
- Multiple validation errors

### `prompt-loading.test.js`
Integration tests that verify actual prompt files in the `prompts/` directory are valid and loadable.

**Test Coverage:**
- Loading prompts from the prompts directory
- All loaded prompts have required fields
- Prompt names are unique
- Argument definitions are valid
- Expected prompts exist
- Template placeholders match defined arguments
- YAML files are parseable
- Template conditional syntax is properly formatted

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Framework

- **Jest**: Testing framework configured for ES modules
- **Node.js VM Modules**: Experimental feature for ES module support in Jest

## Writing New Tests

When adding new test files:

1. Create files with the `.test.js` extension in the `tests/` directory
2. Import the functions you want to test from `../index.js`
3. Use Jest's `describe()` and `test()` functions to structure your tests
4. Run `npm test` to verify your tests pass

### Example Test

```javascript
import { validatePrompt } from '../index.js';

describe('my new test suite', () => {
  test('should do something', () => {
    const result = validatePrompt({...}, 'test.yaml');
    expect(result.valid).toBe(true);
  });
});
```

## Coverage

Test coverage is generated in the `coverage/` directory when running `npm run test:coverage`.

Currently tested files:
- `index.js` - Core server logic including validation and loading functions

## CI/CD Integration

This project includes a GitHub Actions workflow (`.github/workflows/test.yml`) that automatically runs tests on:
- All pull requests to main
- All pushes to main branch

**What the workflow does:**
- Runs tests on Node.js versions 18.x, 20.x, and 22.x
- Generates coverage reports
- Optionally uploads coverage to Codecov (if configured)

**Viewing test results:**
- Check the "Actions" tab in the GitHub repository
- PR checks will show test status before merging
- Failed tests will block the PR status check

## Best Practices

1. **Keep tests focused**: Each test should verify one specific behavior
2. **Use descriptive names**: Test names should clearly describe what they're testing
3. **Test edge cases**: Include tests for error conditions and boundary cases
4. **Maintain test independence**: Tests should not depend on each other
5. **Update tests with code changes**: When adding features, add corresponding tests
