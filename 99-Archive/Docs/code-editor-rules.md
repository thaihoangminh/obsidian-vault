# [Project Name]

Every time you choose to apply a rule(s), explicitly state the rule(s) in the output. You can abbreviate the rule description to a single word or phrase.

## Project Context
[Brief description ]
- [more description]
- [more description]
- [more description]

## Code Style and Structure
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure repository files as follows:
```
server/
├── src/
    ├── components/     # Shared React components
    ├── hooks/          # Custom React hooks
    ├── utils/          # Helper functions
    ├── types/          # TypeScript types
    └── lib/            # Shared libraries
extension/
├── src/
    ├── background/     # Service worker scripts
    ├── content/        # Content scripts
    ├── popup/          # Extension popup UI
    ├── options/        # Extension options page
    ├── components/     # Shared React components
    ├── hooks/          # Custom React hooks
    ├── utils/          # Helper functions
    ├── lib/            # Shared libraries
    ├── types/          # TypeScript types
    └── storage/        # Chrome storage utilities
shared/
├── src/
    ├── types/          # TypeScript types, only used for shared types between server and extension
    └── utils/          # Helper functions, only used for shared functions between server and extension
```

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Chrome Extension
- Express.js

## Naming Conventions
- Use kebab-case for directories and file names
- Favor named exports for components and utilities
- Use camelCase for variables, functions and methods
- Use UPPER_SNAKE_CASE for constants
- Use PascalCase for classes, interfaces and types
- Meaningful names: name variables and functions to reveal their purpose, not just their value

## TypeScript Usage
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid using `any` type; use `unknown` when type is uncertain
- Only use `any` inside generic functions when TypeScript cannot match runtime logic to type logic
- Use interfaces for object shapes that will be implemented or extended
- Use type aliases for union types, intersection types, and complex types
- Use generics to create reusable components
- Use discriminated unions to model data with different shapes and prevent impossible states

## State Management
- Use React Context for global state when needed
- Implement proper cleanup in useEffect hooks

## Syntax and Formatting
- Use "function" keyword for pure functions
- Avoid unnecessary curly braces in conditionals
- Use declarative JSX
- Implement proper TypeScript discriminated unions for message types

## UI and Styling
- Use Shadcn UI and Radix for components
- use `npx shadcn@latest add <component-name>` to add new shadcn components
- Implement Tailwind CSS for styling
- Consider extension-specific constraints (popup dimensions, permissions)
- Follow Material Design guidelines for Chrome extensions
- When adding new shadcn component, document the installation command

## Error Handling
- Implement proper error boundaries
- Log errors appropriately for debugging
- Provide user-friendly error messages
- Handle network failures gracefully

## Testing
- Write unit tests for utilities and components
- Implement E2E tests for critical flows
- Test across different Chrome versions
- Test memory usage and performance

## Security
- Implement Content Security Policy
- Sanitize user inputs
- Handle sensitive data properly
- Follow Chrome extension security best practices
- Implement proper CORS handling

## Git Usage
Commit Message Prefixes:
- "fix:" for bug fixes
- "feat:" for new features
- "perf:" for performance improvements
- "docs:" for documentation changes
- "style:" for formatting changes
- "refactor:" for code refactoring
- "test:" for adding missing tests
- "chore:" for maintenance tasks

Rules:
- Use lowercase for commit messages
- Keep the summary line concise
- Include description for non-obvious changes
- Reference issue numbers when applicable

## Documentation
- Maintain clear README with setup instructions
- Document API interactions and data flows
- Keep manifest.json well-documented
- Don't include comments unless it's for complex logic
- Document permission requirements

## Development Workflow
- Use proper version control
- Implement proper code review process
- Test in multiple environments
- Follow semantic versioning for releases
- Maintain changelog