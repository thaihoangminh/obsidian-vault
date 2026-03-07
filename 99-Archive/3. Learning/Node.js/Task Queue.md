- Macro-task queue: holds tasks like setTimeout, setInterval, setImmediate, and I/O operations.
- Micro-task queue: holds tasks like Promise callbacks and process.nextTick (Node.js-specific)

Micro-tasks are always executed before macro-tasks in the next interation of the [[Event Loop]]