A **primitive** is data that is not an object and has no methods or properties.

| **Primitive Type** | **Example**       | **typeof Result** | **Edge Cases / Notes**                                               |
| ------------------ | ----------------- | ----------------- | -------------------------------------------------------------------- |
| **String**         | "Hello World"     | "string"          | Assigning properties fails due to auto-boxing.                       |
| **Number**         | 42 or 3.14        | "number"          | Precision errors (e.g., 0.1 + 0.2 !== 0.3).                          |
| **BigInt**         | 9007199254740991n | "bigint"          | Cannot mix directly with number; explicit conversion required.       |
| **Boolean**        | true or false     | "boolean"         | Strictly logical values, no special edge cases.                      |
| **Undefined**      | let x;            | "undefined"       | Occurs naturally for uninitialized variables.                        |
| **Symbol**         | Symbol("foo")     | "symbol"          | Each Symbol is unique; use Symbol.for() for global reusable symbols. |
| **Null**           | null              | "object" ⚠️       | Known JS quirk; always use value === null for checking null.         |

> [!info]
> When properties are accessed on primitives, JavaScript _auto-boxes_ the value into a wrapper object and accesses the property on that object instead. For example, `"foo".includes("f")` implicitly creates a [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) wrapper object and calls `String.prototype.includes()` on that object. This auto-boxing behavior is not observable in JavaScript code but is a good mental model of various behaviors — for example, why "mutating" primitives does not work (because `str.foo = 1` is not assigning to the property `foo` of `str` itself, but to an ephemeral wrapper object).
> 

**Primitive types in JavaScript are fundamentally important due to the following reasons:**
- Primitive values are stored and accessed directly at the lowest level of the JavaScript engine. This makes operations on primitives faster and more memory-efficient compared to objects, which require more complex memory management.
- Primitives simplify equality checks, as they’re compared by value, not by reference. This clarity helps developers avoid confusion when comparing data.
- Primitives are immutable, meaning their values can’t change after creation. This immutability helps developers write predictable, bug-resistant code by ensuring the state of primitive data remains consistent throughout the application lifecycle.
- Using primitive values enhances security by preventing unintended side-effects or mutations, which are common sources of bugs or vulnerabilities. Immutable primitives ensure data integrity by eliminating accidental mutations or shared references.
- Because primitives are stored directly in memory, they require less memory overhead compared to object references. This optimizes application performance, especially in large-scale or resource-intensive applications.
###### Reference
https://developer.mozilla.org/en-US/docs/Glossary/Primitive