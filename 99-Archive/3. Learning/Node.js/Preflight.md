Browsers automatically send an **OPTIONS** request (the “preflight” request) to check **CORS** permission before sending non-GET or non-simple requests. Make sure your server handles **OPTIONS** correctly:


```
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.sendStatus(200);
});
```