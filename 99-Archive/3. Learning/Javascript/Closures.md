The combination of a function and the lexical environment within which that function was declared. In simpler terms, a closure allows a function to “remember” the variables from its surrounding scope even after that scope has exited.

Example:

```
function outerFunction() {
    let outerVariable = "I am from outer scope";

    function innerFunction() {
        console.log(outerVariable); // Accessing a variable from the outer function
    }

    return innerFunction;
}

const closureFunction = outerFunction();
closureFunction(); // Logs: "I am from outer scope"
```

#todo 