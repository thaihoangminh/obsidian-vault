A structured checklist covering **code formatting, naming conventions, comments, error handling, security, testing, and version control** with **language-specific examples**.

---

## **1. Code Formatting & Readability**
### **General**
- Use **consistent indentation** (2 spaces, avoid tabs).
- Only add semicolons at the beginning of lines that may introduce ASI failures.
- Use **single quotes (`'`) for strings** except for template literals.
- **Limit lines** to 100 characters.
- **Trailing commas** in objects and arrays for cleaner diffs.
- **Avoid inline comments** unless absolutely needed; prefer self-documenting code.
- No magic numbers or strings; use named constants.
- No unused variables or functions.
- No console logs in production code.
- Use Descriptive Booleans: Boolean names should state a condition, not just its value.
- Keep Code DRY: Duplicate code means duplicate bugs. Try and reuse logic where it makes sense.
- Avoid Deep Nesting: Flatten your code flow to improve clarity and reduce cognitive load.
- Comment Why, Not What: Explain the intention behind your code, not the obvious mechanics.
- Code Should Be Self-Explanatory: Well-written code needs fewer comments because it reads like a story.

### **JavaScript/TypeScript**
- Use **ESLint** (JavaScript) and **TSLint/ESLint with TypeScript** for linting.
- Use **Prettier** for automatic code styling.
- **Break long chains** of method calls into multiple lines.
- **Optional chaining** (`?.`) and **nullish coalescing** (`??`) for safer access.
- **Destructure objects/arrays** where applicable.

### **TypeScript**
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid using `any` type; use `unknown` when type is uncertain
- Only use `any` inside generic functions when TypeScript cannot match runtime logic to type logic
- Use interfaces for object shapes that will be implemented or extended
- Use type aliases for union types, intersection types, and complex types
- Use generics to create reusable components
- Use discriminated unions to model data with different shapes and prevent impossible states

## **2. Naming Conventions**  

- Use kebab-case for directories and file names
- Favor named exports for components and utilities
- Use camelCase for variables, functions and methods
- Use UPPER_SNAKE_CASE for constants
- Use PascalCase for classes, interfaces and types
- Meaningful names: name variables and functions to reveal their purpose, not just their value

## **3. Variables & Functions**
- Always use const or let, never var.
- Prefer const unless reassignment is needed.
- Functions must be declared as arrow functions unless using this.
- Destructure objects/arrays where possible.
- One Function, One Responsibility: Functions should do one thing.
- Limit Function Arguments: Too many parameters confuse. Group related data into objects.

## **4. File & Project Structure**
#### **Node.js/TypeScript Project Structure**
```
project/
├── src/                # Source files
│   ├── controllers/    # Route handlers
│   ├── services/       # Business logic
│   ├── models/         # Data models (DB schemas)
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   ├── config/         # Configuration files
│   └── types/          # TypeScript types/interfaces
├── tests/              # Unit & integration tests
├── .eslintrc          # ESLint config
├── .prettierrc        # Prettier config
├── tsconfig.json      # TypeScript config
└── package.json
```

#### **Key Practices**
- **One class/interface per file** (unless closely related).
- **Group related files** (e.g., `user.controller.ts`, `user.service.ts`).
- **Avoid deep nesting** in directories.
- **Use `index.ts` files** for cleaner imports (barrel exports).

### **Module Imports**
- **Absolute imports** (avoid `../../` hell):
  ```ts
  import { UserService } from '@/services/user-service';
  ```
- Group imports:
  ```ts
  // External
  import express from 'express';
  // Internal
  import { UserController } from '@/controllers';
  ```


---

## **5. Error Handling**
### **General**
- **Never use empty catch blocks** (log or handle errors properly).
- **Throw meaningful errors** with custom messages.
- **Use `try-catch` for async/await** or `.catch()` for Promises.

### **Node.js/TypeScript Best Practices**
- **Use `Error` objects** (not strings/numbers).
- **Custom error classes** for better debugging:
  ```typescript
  class DatabaseError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "DatabaseError";
    }
  }
  ```
- **Centralized error handling** in Express/Koa:
  ```typescript
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  ```

---

## **6. Testing Practices**
### **Unit Testing**
- Use **Jest** (or Mocha + Chai) for testing.
- Follow **AAA pattern** (Arrange, Act, Assert).
- **Mock external dependencies** (APIs, DBs) using `jest.mock()`.
- **Test edge cases** (invalid inputs, error scenarios).

### **Example (Jest)**
```typescript
describe('UserService', () => {
  it('should create a user', async () => {
    // Arrange
    const mockUser = { name: 'John' };
    UserRepository.create = jest.fn().mockResolvedValue(mockUser);

    // Act
    const result = await UserService.createUser(mockUser);

    // Assert
    expect(result).toEqual(mockUser);
    expect(UserRepository.create).toHaveBeenCalledWith(mockUser);
  });
});
```

### **Integration Testing**
- Test **API endpoints** (Supertest).
- **Reset DB state** before/after tests.
- **Avoid testing implementation details**.

### **E2E Testing**
- Use **Supertest** for API testing.
- **Reset DB state** between tests.
- **Test authentication & authorization** flows.

---

## **7. Performance Optimization**
### **JavaScript/TypeScript**
- **Use `Map`/`Set`** for frequent lookups.
- **Debounce/throttle** expensive operations (e.g., search inputs).
- **Lazy-load modules** (dynamic imports in ES2020+).
- **Use `Promise.all`** for parallel async operations.

### **Node.js-Specific**
- **Use streams** for large file processing (avoid `fs.readFileSync`).
- **Cache responses** (Redis, Memcached).
- **Avoid blocking the event loop** (use `setImmediate`/`nextTick`for heavy tasks; use `worker_threads` for CPU-heavy tasks).
- **Use connection pooling** for databases.

### **Memory Management**
- **Avoid memory leaks** (remove event listeners, clear intervals).
- **Use `process.memoryUsage()`** for monitoring.

---

## **8. Security Best Practices**
- **Validate & sanitize inputs** (e.g., `express-validator`).
- **Use parameterized queries** (avoid SQL injection).
- **Set secure HTTP headers** (Helmet middleware).
- **Rate limiting** (e.g., `express-rate-limit`).
- **Environment variables** (never hardcode secrets).
- **Input validation** on every external boundary (use zod).
- **Escape output** in HTML/SQL/Logs.
- **Use Helmet, CORS, rate-limit, CSRF** middleware in Express/Koa. 
- **Keep Node.js LTS current**; recent CVEs (e.g., CVE-2025-23089) target EOL versions. 
- **Run npm audit --production in CI**; block merges on critical issues.


---

## **9. Documentation & Comments**
- **JSDoc** for functions (especially public APIs).
- **README.md** for project setup & usage.
- **Avoid redundant comments** (self-documenting code is better).
- Tag technical debt with TODO(username, yyyy-mm-dd): … so stale items are obvious.
