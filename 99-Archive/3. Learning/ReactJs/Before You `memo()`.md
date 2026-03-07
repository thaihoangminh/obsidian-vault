Before you apply optimizations like **memo** or **useMemo**, it might make sense to look if you can split the parts that change from the parts that don’t change.


![[Screenshot 2024-05-06 at 20.37.48 1.png]]


Verify you’re running a **production build**
Verify that you didn’t put the state higher in the tree than necessary. (For example, putting input state in a centralized store might not be the best idea.)
Run `React DevTools Profiler` to see what gets re-rendered, and wrap the most expensive subtrees with `memo()`. (And add `useMemo()` where needed.)
Move State Down


![[Screenshot 2024-05-06 at 20.34.24.png]]


Lift Content Up

![[Screenshot 2024-05-06 at 20.39.14.png]]


[Data Fetching with React Server Components](https://www.youtube.com/watch?v=TQQPAU21ZUw&t=1314s)

#react #memoizing #memo #reading-list