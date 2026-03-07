#### 1. Definitions
- async: Loads asynchronously, executes immediately after download finishes, does **not** guarantee execution order.
- defer: Loads asynchronously, executes after HTML parsing completes, **maintains** execution order.

| **Attribute** | **Fetching** | **Execution Timing**       | **Execution Order** |
| ------------- | ------------ | -------------------------- | ------------------- |
| async         | Async        | Immediately after download | **Not guaranteed**  |
| defer         | Async        | HTML parsing completes     | Sequential          |
#### 2. Real-world Usage

🔅 Use **async** for:

- Independent scripts (analytics, ads).
- Scripts with no dependency on DOM or other scripts.

**Example (Google Analytics):**

```javascript
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

🔅 Use **defer** for:
- Scripts depending on DOM (libraries/frameworks).
- Multiple scripts depending on execution order.

**Example (React project):**

```javascript
<head>
  <script defer src="https://cdn/react.js"></script>
  <script defer src="https://cdn/react-dom.js"></script>
  <script defer src="app.js"></script>
</head>
<body>
  <div id="root"></div>
</body>
```

#### 3. Important Edge Cases

> [!warning]
> Inline scripts with defer
>
> - Browsers completely ignore defer on inline scripts.
> - Inline scripts execute immediately, blocking HTML parsing.

❌ Ineffective example:

```javascript
<script defer>   
  console.log('Executes immediately, defer ignored.');
</script>
```

✅ Recommended alternative (DOM loaded event):

```javascript
<script>
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Executes after DOM is ready.');
  });
</script>
```

> [!warning]
> Execution order with async
> 
> - Scripts with async attribute do NOT guarantee the execution order.
> - Avoid using multiple async scripts if execution order matters.

**Example (Order not guaranteed):**

```javascript
<script async src="a.js"></script>
<script async src="b.js"></script>
```

• b.js could run before a.js.

✅ 4. Best Practice Recommendations

| Scenario                                       | Recommended Attribute |
| ---------------------------------------------- | --------------------- |
| DOM-dependent scripts, execution order matters | ✅ defer               |
| Independent, standalone scripts                | ✅ async               |
| Inline scripts                                 | ❌ avoid defer         |

✅ 5. Recommended Placement (Best Practice)

- async and defer scripts can safely go inside <head> for early download:

```html
<head>
  <!-- async (independent scripts) -->
  <script async src="analytics.js"></script>

  <!-- defer (dependent scripts) -->
  <script defer src="library.js"></script>
  <script defer src="app.js"></script>
</head>
```
✅ 6. Example of Recommended Mixed Approach

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My App</title>

  <!-- Independent async script (Analytics) -->
  <script async src="https://analytics.example.com/script.js"></script>

  <!-- Application scripts with defer -->
  <script defer src="react.js"></script>
  <script defer src="app.js"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```
• Benefit: Early asynchronous loading (async), sequential execution after HTML parsing (defer).

✅ **Conclusion (Summary)**
- async: Faster loading but unpredictable execution order.
- defer: Predictable, ordered execution after HTML parsing completes.
- Inline scripts do not respect defer (use DOMContentLoaded instead).
- Always place scripts in <head> with the correct attributes (async or defer) for optimal performance.


✅ **Visual Timeline Diagram:**

![[Attachments/Async Defer.svg]]

```
HTML Parsing:   |==== Parsing HTML Document ====| DOM Ready |
                |-------------------------------------------|

Regular script:       |---- Download ----|-- Execute --|
                      (Blocks parsing)

Async script:           |---- Download ----|
                                |-- Execute --|
                      (Executes immediately after downloading, parsing pauses briefly during execution)

Defer script:           |---- Download ----|
                                                     |-- Execute --|
                      (Executes after parsing completes)
```