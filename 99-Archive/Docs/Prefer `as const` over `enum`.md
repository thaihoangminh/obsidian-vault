## Rule: Prioritize `as const` for TypeScript Constant Collections

**Guideline:** When generating TypeScript code that requires a collection of named string, numeric, or other literal constants, **prefer using an object literal with an `as const` assertion over an `enum`**.

**Core Reason:** `as const` provides a more lightweight, JavaScript-idiomatic, and bundle-size-friendly approach for defining fixed sets of constants without sacrificing type safety for most common use cases.

### Why Prefer `as const`?

1. **Zero JavaScript Runtime Overhead for the Structure:**
    
    - `as const` objects are plain JavaScript objects. The `as const` part is a compile-time instruction to TypeScript to infer the most specific literal types for its properties.
        
    - `enum`s, on the other hand, typically generate an Immediately Invoked Function Expression (IIFE) and additional JavaScript code to create the enum object, which can include reverse mappings (for numeric enums). This adds to the bundle size.
        
2. **Improved Tree-Shaking:**
    
    - Since `as const` objects are standard JavaScript objects, modern bundlers (like Webpack, Rollup, Parcel) can more effectively perform tree-shaking, removing unused constant values.
        
    - The IIFE structure of enums can sometimes hinder optimal tree-shaking.
        
3. **Simpler and More Predictable JavaScript Output:**
    
    - The compiled JavaScript for an `as const` object is exactly what you wrote (minus the type assertion). This makes it easier to understand, debug, and predict behavior.
        
4. **Sufficient and Flexible Type Safety:**
    
    - `as const` ensures that each property is typed as its literal value (e.g., `name: "Alice"` becomes `readonly name: "Alice"`).
        
    - You can easily create a union type of all possible constant values using `typeof MY_CONSTS[keyof typeof MY_CONSTS]`.
        
5. **Standard JavaScript Operations:**
    
    - Being regular objects, you can directly use standard JavaScript methods like `Object.keys()`, `Object.values()`, and `Object.entries()` without any special considerations.
        

### Examples:

**✅ DO THIS (Prefer `as const`):**

```
// For string constants
const UserAction = {
  CREATE: "CREATE_USER",
  READ: "READ_USER",
  UPDATE: "UPDATE_USER",
  DELETE: "DELETE_USER",
} as const;

// Type representing all possible user actions
type UserActionType = typeof UserAction[keyof typeof UserAction];
// Result: type UserActionType = "CREATE_USER" | "READ_USER" | "UPDATE_USER" | "DELETE_USER"

function handleUserAction(action: UserActionType) {
  if (action === UserAction.CREATE) {
    console.log("Creating user...");
  }
  // ... other actions
}

// For numeric constants
const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
} as const;

type HttpStatusCodeType = typeof HttpStatusCode[keyof typeof HttpStatusCode];
// Result: type HttpStatusCodeType = 200 | 201 | 400 | 401 | 404

function handleResponse(code: HttpStatusCodeType) {
  if (code === HttpStatusCode.NOT_FOUND) {
    console.error("Resource not found.");
  }
}
```

**❌ AVOID THIS (Unless specific exceptions apply):**

```
// String enum (less preferred for new code)
enum LegacyUserAction {
  CREATE = "CREATE_USER",
  READ = "READ_USER",
  UPDATE = "UPDATE_USER",
  DELETE = "DELETE_USER",
}

function handleLegacyUserAction(action: LegacyUserAction) {
  if (action === LegacyUserAction.CREATE) {
    console.log("Creating user...");
  }
}

// Numeric enum (less preferred for new code where as const suffices)
enum LegacyHttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}
```

### Exceptions to the Rule:

While `as const` is generally preferred, there are niche scenarios where `enum` might still be considered:

1. **Strict Nominal Typing Requirement:** If you absolutely need a distinct _nominal type_ (where `MyEnum.Value` is not just its underlying string/number but a unique type `MyEnum`) and this cannot be adequately modeled with branded types or other techniques alongside `as const`. This is rare for typical constant collections.
    
2. **Interfacing with External Libraries or APIs that Expect Enums:** If an external JavaScript or TypeScript library specifically requires an `enum` type as part of its API.
    
3. **Existing Codebase Consistency:** In a large, mature codebase that already uses `enum`s extensively, maintaining consistency might be prioritized over adopting `as const` for new additions, unless a broader refactor is planned.
    
4. **Numeric Enums with Automatic Value Generation (Rarely a good reason for** _**new**_ **code):** If you rely on the auto-incrementing behavior of numeric enums _without_ explicit initializers (e.g., `enum Direction { Up, Down, Left, Right }`). However, explicit values are generally clearer.
    

**Instruction to LLM:** Unless one of the specific exceptions above clearly applies and is justified, **default to using object literals with `as const`** for defining sets of constants in TypeScript code generation. If an `enum` is chosen, provide a brief justification based on the exceptions.