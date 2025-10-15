// Common coding prompt templates
export const prompts = [
  {
    name: "debug",
    description: "Help debug an issue",
    arguments: [
      {
        name: "error",
        description: "The error message or issue description",
        required: false,
      },
    ],
    template: `I'm encountering {error}an issue{/error}. Please help me debug this by:
- Identifying the root cause
- Explaining why it's happening
- Providing a fix with explanation
- Suggesting how to prevent similar issues`,
  },
  {
    name: "test-cases",
    description: "Generate comprehensive test cases",
    arguments: [
      {
        name: "framework",
        description: "Testing framework to use (e.g., 'Jest', 'Mocha', 'pytest')",
        required: false,
      },
    ],
    template: `Please generate comprehensive test cases{framework} using {framework}{/framework} for this code.

Include:
- Unit tests for core functionality
- Edge cases and boundary conditions
- Error handling scenarios
- Mock/stub suggestions if needed

Make tests clear, maintainable, and well-documented.`,
  },
  {
    name: "explain",
    description: "Explain how code works",
    arguments: [
      {
        name: "audience",
        description: "Target audience level (e.g., 'beginner', 'intermediate', 'expert')",
        required: false,
      },
    ],
    template: `Please explain how this code works{audience} for a {audience} level developer{/audience}.

Include:
- High-level overview
- Step-by-step breakdown
- Key concepts and patterns used
- Potential gotchas or important details`,
  },
  {
    name: "document",
    description: "Generate documentation for code",
    template: `Please generate comprehensive documentation for this code including:
- Function/class descriptions
- Parameter and return value documentation
- Usage examples
- Any important notes or warnings

Use appropriate documentation format (JSDoc, docstrings, etc.).`,
  },
  {
    name: "add-feature",
    description: "Add a new feature to existing code",
    arguments: [
      {
        name: "feature",
        description: "Description of the feature to add",
        required: true,
      },
    ],
    template: `Please help me add this feature: {feature}

Provide:
- Implementation approach
- Code changes needed
- Integration with existing code
- Testing recommendations
- Any breaking changes or migration notes`,
  },
];
