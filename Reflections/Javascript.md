# Javascript Reflections

Note: This is in progress and might get moved to my dashboard.

# Datastructures
1. Min/Max Heap
    - Use datastructures-js to get MinPriorityQueue and MaxPriorityQueue. For example: 
    
        ```const queue = new MinPriorityQueue({ priority: x => x.val })```
2. Object
    - Object.entries runs in O(N) or worse time. Don't rely on it to get a random element.