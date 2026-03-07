TURBO_TOKEN=GhIx6FcZlY1MB9Ou3m3JCOzN
TURBO_TEAM=thaihoang


```
docker build -f apps/web/Dockerfile . --progress=plain --build-arg TURBO_TEAM="thaihoang" --build-arg TURBO_TOKEN="GhIx6FcZlY1MB9Ou3m3JCOzN" --no-cache
```

#thaihoang-dev