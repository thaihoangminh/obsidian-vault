##### What is Hoisting?
JavaScript **Hoisting** refers to the process whereby the interpreter appears to move the _declaration_ of functions, variables, classes, or imports to the top of their [[Scope]], prior to execution of the code.

| **Type** | **Declaration**                                    | **Hoisted?**       | **Initial Value**   | **Reference Before Declaration** |
| -------- | -------------------------------------------------- | ------------------ | ------------------- | -------------------------------- |
| 1        | Function Declaration (not included arrow function) | ✅ Yes              | Function Definition | ✅ Yes, callable                  |
| 2        | var                                                | ✅ Yes              | undefined           | ✅ Yes, but undefined             |
| 3        | let, const, class, arrow function                  | 🚧 Partially (TDZ) | Uninitialized (TDZ) | ❌ No (throws ReferenceError)     |
| 4        | import                                             | ✅ Yes              | Imported bindings   | ✅ Yes, side effects evaluated    |

##### Types of Hoisting Behavior
1. **Value Hoisting:**
- The declaration is hoisted, allowing the variable or function’s value to be used before its declaration line.
- Example: Functions declared using function, function*, async function, and async function* show this behavior.
```javascript
hello(); // hello
function hello() {
  return 'hello';
}

world(); // Uncaught ReferenceError: Cannot access 'world' before initialization
const world = () => 'world';

```

2. **Declaration Hoisting:**
- The declaration is hoisted, allowing the variable to be referenced before its actual declaration, but the initial value is always undefined.
- Example: Variables declared with var exhibit this behavior.
- Example:
```javascript
console.log(a); // undefined
var a = 10;
```

3. **Behavioral Changes Before Declaration:**
- The declaration of the variable affects the scope even before the line where it’s declared.
- Example: Declarations made with let, const, and class (lexical declarations) exhibit this behavior due to the “temporal dead zone” (TDZ). Any access before initialization causes a ReferenceError.
```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;

console.log(y); // ReferenceError: Cannot access 'y' before initialization
const y = 10;

const myInstance = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization
class MyClass {}
```

4. **Side Effects Occur Before Code Execution:**
- The declaration causes side effects before the rest of the code runs.
- Example: import declarations in JavaScript modules.

##### Reference

https://developer.mozilla.org/en-US/docs/Glossary/Hoisting