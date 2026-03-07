Before:

```
// 🔴 Avoid: Adjusting state on prop change in an Effect

useEffect(() => {
  setSelection(null);
}, [items]);
```

After:

```
// Better: Adjust the state while rendering

const [prevItems, setPrevItems] = useState(items);
if (items !== prevItems) {
  setPrevItems(items);
  setSelection(null);
}
```

[**You Might Not Need an Effect**](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)


#react