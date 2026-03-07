An **IIFE** (Immediately Invoked Function Expression) is an idiom in which a [JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript) [function](https://developer.mozilla.org/en-US/docs/Glossary/Function) runs as soon as it is defined. It is also known as a _self-executing anonymous function_. The name IIFE is promoted by Ben Alman in [his blog](https://web.archive.org/web/20171201033208/http://benalman.com/news/2010/11/immediately-invoked-function-expression/#iife).

```javascript
// standard IIFE
(function () {
  // statements…
})();

// arrow function variant
(() => {
  // statements…
})();

// async IIFE
(async () => {
  // statements…
})();
```

```javascript
var x = 3;
(function (a) {
  console.log(x); // undefined
  var x = "local value";
  console.log(x); // local value
  console.log(a); // 3
})(x);
console.log(x); // 3
```
##### Use case:
- **Encapsulating code** within a private [[Scope]], avoiding global namespace pollution.
- **Creating async contexts** within non-async code.
- **Evaluating complex logic** and returning values immediately.

> [!attention]
> Many traditional use cases of IIFEs have been obsoleted by new syntax features such as [modules](JavaScript%20modules.md) and [block-scoped declarations](Scope.md)
> 

**Old way (IIFE):**
```javascript
(function() {
  var message = "Hello";
  console.log(message); // Hello
})();
console.log(message); // ReferenceError: message is not defined
```

**Modern way (let/const block scope):**
```javascript
{
  let message = "Hello";
  console.log(message); // Hello
}
console.log(message); // ReferenceError: message is not defined
```

**Old way (IIFE Module Pattern):**
```javascript
// mathModule.js
var mathModule = (function() {
  var privateVar = 5;

  function privateAdd(a) {
    return a + privateVar;
  }

  return {
    publicAdd: function(num) {
      return privateAdd(num);
    }
  };
})();

console.log(mathModule.publicAdd(10)); // 15
console.log(mathModule.privateVar);    // undefined (private)
```

**Modern way (ES Modules):**
```javascript
// mathModule.js
const privateVar = 5;

function privateAdd(a) {
  return a + privateVar;
}

export function publicAdd(num) {
  return privateAdd(num);
}

// main.js
import { publicAdd } from './mathModule.js';

console.log(publicAdd(10)); // 15
```
##### Reference
https://developer.mozilla.org/en-US/docs/Glossary/IIFE