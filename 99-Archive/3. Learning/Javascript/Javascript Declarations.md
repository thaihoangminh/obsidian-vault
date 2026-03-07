##### Declaring Variables

| Keyword | [[Scope]]             | Hoisted |
| ------- | --------------------- | ------- |
| var     | global scope (window) | ✅       |
| let     | block scope           | ❌       |
| const   | block scope           | ❌       |

```javascript
console.log(x);
var x = 3;
// undefined
```

```javascript
console.log(y);
let y = 4;
// Uncaught ReferenceError: Cannot access 'y' before initialization
```

```javascript
console.log(z);
const z = 5;
// Uncaught ReferenceError: Cannot access 'z' before initialization
```

##### Reference
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations
