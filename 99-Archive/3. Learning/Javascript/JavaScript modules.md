ES modules offer standardized way to organize and reuse code in separate files.

##### Separate a large file into modules
```javascript
// lib.mjs
export const repeat = (string) => `${string} ${string}`;
export default function shout(string) {
  return `${string.toUpperCase()}!`;
}

// main.mjs
import shout, { repeat } from './lib.mjs';
shout('hello'); // "HELLO!"
repeat('world'); // "world world"
```

##### Dynamic module loading
- This allows you to dynamically load modules only when they are needed. rather than having to load everything up front.
- They are always available, even in script environments. Therefore, if you have an existing `<script>` tag in your HTML that doesn't have `type="module"`, you can still reuse code distributed as modules by dynamically importing it.

```html
<head>
<script type="importmap">  
  {  
    "imports": {
      "@js/books": "./js/books.mjs",
      "@js/movies": "./js/movies.mjs",
      "@js/video-games": "./js/video-games.mjs",
    }
  }
</script>
</head>
<body>
  <main></main>
  <nav>
    <a href="books.html" data-entry-module="books">Books</a>  
    <a href="movies.html" data-entry-module="movies">Movies</a>  
    <a href="video-games.html" data-entry-module="video-games">Video Games</a>
  </nav>
  <script>
    const links = document.querySelectorAll('nav > a');
    for (const link of links) {
      link.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
          const module = await import(`@js/${link.dataset.entryModule}`);
          const result = module.loadPageInto(main);
          preview.textContent = result ?? "No result";
        } catch (error) {  
          main.textContent = error.message;
        }
      });
    }
  </script>
</body>
```

##### Recommend file extension `.mjs`
- This is good for clarify which file are modules. The `<script type="module">` attribute is used to denote when a module is being pointed to

> [!info]
> In some module systems, you can use a module specifier like `modules/square` instead of `./modules/square.js` that isn't a relative or absolute path, and that doesn't have a file extension. This kind of specifier can be used in a browser environment if you first define an [import map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps).
> 

##### Importing modules using import maps
- Below we can see a map that defines a `@js/books` module specifier key, which in this case maps to a relative address value.
```javascript
<script type="importmap">  
  {  
    "imports": {  
      "@js/books": "./js/books.mjs"  
    }  
  }  
</script>

const module = import('@js/books')
```

##### Loading non-JavaScript resources 
- By default, the browser assumes that the resource is JavaScript, and will throw an error if the resolved resource is something else. To import JSON, CSS, or other types of resource, use the [import attributes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with) syntax:
```javascript
<script type="module">  
  import colors from "./colors.json" with { type: "json" };
  import styles from "./styles.css" with { type: "css" };
</script>

// getColors.mjs
const colors = fetch("../data/colors.json").then((response) => response.json());
export default await colors;
```

##### Import declarations are hoisted
- The imported values are available in the module's code even before the place that declares them
- The imported module's side effects are produced before the rest of the module's code starts running
```javascript
// ...
const myCanvas = new Canvas("myCanvas", document.body, 480, 320);
myCanvas.create();
import { Canvas } from "./modules/canvas.js";
myCanvas.createReportList();
// ...

```

Still, it is considered good practice to put all your imports at the top of the code, which makes it easier to analyze dependencies.

##### Cyclic imports: Cyclic imports don't always fail.
- Modules can import other modules, and those modules can import other modules, and so on.
```javascript
// -- a.js --
import { b } from "./b.js";

// -- b.js --
import { a } from "./a.js";

// Cycle:
// a.js ───> b.js
//  ^         │
//  |         |
//  └─────────┘

```

You should usually avoid cyclic imports in your project, because they make your code more error-prone. Some common cycle-elimination techniques are:
- Merge the two modules into one.

Before:
```javascript
// moduleA.js
import { functionB } from './moduleB.js';
export function functionA() {
  console.log("Function A");
  functionB();
}

// moduleB.js
import { functionA } from './moduleA.js';
export function functionB() {
  console.log("Function B");
  // May call functionA
}
```

After:
```javascript
// combinedModule.js
export function functionA() {
  console.log("Function A");
  functionB();
}

export function functionB() {
  console.log("Function B");
  // Can directly call functionA when needed
}
```

- Move the shared code into a third module.
Before:
```javascript
// user.js
import { validateEmail } from './auth.js';
export class User {
  constructor(email) { this.email = email; }
  isValid() { return validateEmail(this.email); }
}

// auth.js
import { User } from './user.js';
export function validateEmail(email) { return email.includes('@'); }
export function createUser(email) { return new User(email); }
```

After:
```javascript
// validation.js (new shared module)
export function validateEmail(email) {
  return email.includes('@');
}

// user.js
import { validateEmail } from './validation.js';
export class User {
  constructor(email) { this.email = email; }
  isValid() { return validateEmail(this.email); }
}

// auth.js
import { User } from './user.js';
import { validateEmail } from './validation.js';
export function createUser(email) { return new User(email); }
export { validateEmail };
```

- Move some code from one module to the other.
Before:
```javascript
// cart.js
import { calculateTax } from './checkout.js';
export class Cart {
  constructor() { this.items = []; }
  addItem(item) { this.items.push(item); }
  getTotalWithTax() {
    const subtotal = this.getSubtotal();
    return subtotal + calculateTax(subtotal);
  }
  getSubtotal() { return this.items.reduce((sum, item) => sum + item.price, 0); }
}

// checkout.js
import { Cart } from './cart.js';
export function calculateTax(amount) { return amount * 0.08; }
export function createNewCart() { return new Cart(); }
```

After:
```javascript
// cart.js
export class Cart {
  constructor() { this.items = []; }
  addItem(item) { this.items.push(item); }
  getSubtotal() { return this.items.reduce((sum, item) => sum + item.price, 0); }
  // Tax calculation moved into Cart
  getTotalWithTax(taxRate = 0.08) {
    const subtotal = this.getSubtotal();
    return subtotal + (subtotal * taxRate);
  }
}

// checkout.js
import { Cart } from './cart.js';
export function createNewCart() { return new Cart(); }
```

##### Pros
- Load code only when needed, improve initial load performance -> Code splitting and reduced bundle sized for main script
- Conditional-load
- Once loaded, modules are typically cached by the browser, so subsequent imports are much faster unless cache invalidation occurs.

##### References
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
https://v8.dev/features/modules
