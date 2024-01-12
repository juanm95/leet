// Implement Graph as Adjacency list and as Matrix
// Implement Binary Tree Traversal
// Do BFS, DFS, Bidirectional Search
class Queue {
    array = []; offset = 0;
    constructor() {
    }
    enqueue(elem) {
        this.array.push(elem);
    }
    dequeue() {
        var elem = this.array[this.offset];
        this.offset++;
        return elem;
    }
    isEmpty() {
        return this.offset == this.array.length;
    }
}

class TreeNode {
    left; right; height = 1;
    constructor(data) {
        this.data = data;
    }
}

class AVLTree {
    root;
    constructor() {
    }

    height(node) {
        return node ? node.height : 0;
    }

    balance(node) {
        return this.height(node.left) - this.height(node.right);
    }

    calculateNewHeight(node) {
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    rotateRight(node) {
        var newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;
        node.height = this.calculateNewHeight(node);
        newRoot.height = this.calculateNewHeight(newRoot);
        return newRoot;
    }

    rotateLeft(node) {
        var newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;
        node.height = this.calculateNewHeight(node);
        newRoot.height = this.calculateNewHeight(newRoot);
        return newRoot;
    }

    insertHelper(node, data) {
        // Base case, just return a new node, the calling function will then put that node in the right place.
        if (node == null) return new TreeNode(data);

        if (data > node.data) {
            node.right = this.insertHelper(node.right, data);
        } else {
            node.left = this.insertHelper(node.left, data);
        }

        node.height = this.calculateNewHeight(node);
        var balance = this.balance(node);
        if (balance > 1) {
            if (this.balance(node.left) == -1) {
                node.left = this.rotateLeft(node.left);
            }
            return this.rotateRight(node);
        }
        if (balance < -1) {
            if (this.balance(node.right) == 1) {
                node.right = this.rotateRight(node.right);
            }
            return this.rotateLeft(node);
        }

        // return node without rotations
        return node;
    }

    insert(data) {
        this.root = this.insertHelper(this.root, data);
    }

    inorderSuccessor(node) {
        node = node.right;
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    rebalance(node) {
        node.height = this.calculateNewHeight(node);
        var balance = this.balance(node);
        if (balance > 1) {
            if (this.balance(node.left) == -1) {
                node.left = this.rotateLeft(node.left);
            }
            return this.rotateRight(node);
        }
        if (balance < -1) {
            if (this.balance(node.right) == 1) {
                node.right = this.rotateRight(node.right);
            }
            return this.rotateLeft(node);
        }
        return node;
    }
    
    deleteHelper(node, data) {
        if (node == null) return null;

        if (data > node.data) {
            // stuff under this node is changing, we gotta rebalance it later.
            node.right = this.deleteHelper(node.right, data);
        } else if (data < node.data) {
            // stuff under this node is changing, we gotta rebalance it later.
            node.left = this.deleteHelper(node.left, data);
        } else {
            if (node.left && node.right) {
                node.data = this.inorderSuccessor(node).data;
                node.right = this.deleteHelper(node.right, node.data);
                node = this.rebalance(node);
                return node;
            } else if (node.left) {
                // rebalance not needed for this node.
                return node.left;
            } else if (node.right) {
                // rebalance not needed for this node
                return node.right;
            } else {
                return null;
            }
        }

        node = this.rebalance(node);
        return node;
    }

    delete(data) {
        this.root = this.deleteHelper(this.root, data);
    }

    print() {
        var q = new Queue();
        var level = [];
        var currentDepth = 0;
        q.enqueue({node: this.root, depth: 0});
        while (!q.isEmpty()) {
            var pair = q.dequeue();
            if (!pair) continue;
            var {node, depth} = pair;
            if (depth > currentDepth) {
                console.log(level.join(" "));
                level = [];
                currentDepth = depth;
            }
            level.push(node.data);
            if (node.data != "*") {
                q.enqueue({node: node.left || new TreeNode("*"), depth: depth + 1});
                q.enqueue({node: node.right || new TreeNode("*"), depth: depth + 1});
            }
        }
    }
}

class PriorityElement {
    constructor(element, priority) {
        this.elem = element;
        this.priority = priority;
    }
}
class MaxQueue {
    array; size = 0;
    constructor(initSize = 50) {
        this.array = new Array(initSize);
    }

    leftChildIndex(index) {
        return index * 2;
    }

    rightChildIndex(index) {
        return (index * 2) + 1;
    }

    getLeftChild(index) {
        var childIndex = this.leftChildIndex(index);
        if (childIndex >= this.array.length) {
            return null;
        }

        return this.array[childIndex];
    }

    getRightChild(index) {
        var childIndex = this.rightChildIndex(index);
        if (childIndex >= this.array.length) {
            return null;
        }

        return this.array[childIndex];
    }

    parentIndex(index) {
        return Math.floor(index / 2);
    }

    getParent(index) {
        var parentIndex = this.parentIndex(index);
        if (parentIndex < 1) return null;

        return this.array[parentIndex];
    }

    swap(index1, index2) {
        var temp = this.array[index2];
        this.array[index2] = this.array[index1];
        this.array[index1] = temp;
    }
    
    shiftUp(index) {
        if (index < 2) return;
        var element = this.array[index];
        var parentIndex = this.parentIndex(index)
        var parentElement = this.getParent(index);
        if (element.priority > parentElement.priority) {
            this.swap(index, parentIndex);
            this.shiftUp(parentIndex);
        }
        return;
    }

    shiftDown(index) {
        if (index > this.size) return null;
        var newMax = index;
        var leftChildIndex = this.leftChildIndex(index);
        if (leftChildIndex <= this.size 
            && this.array[leftChildIndex].priority > this.array[newMax].priority) {
            newMax = leftChildIndex;
        }

        var rightChildIndex = this.rightChildIndex(index);
        if (rightChildIndex <= this.size 
            && this.array[rightChildIndex].priority > this.array[newMax].priority) {
                newMax = rightChildIndex;
        }

        if (newMax != index) {
            this.swap(index, newMax);
            // newMax is now where our old parent is.
            this.shiftDown(newMax);
        }
    }

    insert(data, priority) {
        this.size++;

        if (this.size >= this.array.length) {
            this.array.length = this.size * 2;
        }

        this.array[this.size] = new PriorityElement(data, priority);

        this.shiftUp(this.size);
    }

    removeMax() {
        if (this.size < 1) return null;
        var max = this.array[1];
        this.array[1] = this.array[this.size];
        this.size--;
        this.shiftDown(1);

        return max;
    }

    print() {
        console.log(this.array);
    }
}

class AdjacencyGraph {
    matrix = [];
    keyToIndexMap = {};
    indexToKeyMap = [];
    constructor() {
    }

    add(key) {

    }

    connect(sourceKey, destinationKey) {
        if (!sourceKey in this.keyToIndexMap || !destinationKey in this.keyToIndexMap) {
            return;
        }

        var sourceIndex = this.keyToIndexMap[sourceKey];
        var destinationKey = this.keyToIndexMap[destinationKey];
        this.matrix[sourceIndex][destinationIndex] = true;
    }

    getNeighbors(sourceIndex) {
        this.matrix[sourceIndex].reduce((connected, index) => {
            if(connected) {
                return this.indexToKeyMap[index];
            }
        });
    }
}

class Node {
    key; neighbors = [];
    constructor(key) {
        this.key = key;
    }
    addNeighbor(node) {
        this.neighbors.push(node);
    }
}

class ListGraph {
    nodes = {};
    constructor() {}
    addNode(key) {
        this.nodes[key] = new Node(key);
        return this.nodes[key];
    }
    getNode(key) {
        return this.nodes[key];
    }
    addConnection(sourceKey, destinationKey) {
        this.nodes[sourceKey].addNeighbor(this.nodes[destinationKey]);
    }
    BFS(sourceKey, destinationKey) {
        var queue = new Queue();
        var visitedNodes = {};
        queue.enqueue([this.getNode(sourceKey)]);
        while(!queue.isEmpty()) {
            var path = queue.dequeue();
            var lastNode = path[path.length - 1];
            if (lastNode.key == destinationKey) {
                return path;
            } else {
                lastNode.neighbors.forEach((node) => {
                    if (!visitedNodes[node.key]) {
                        visitedNodes[node.key] = true;
                        queue.enqueue(path.concat(node));
                    }
                });
            }
        }

        return null;
    }
}

var listGraph = new ListGraph();
[1, 2, 3, 4, 5].forEach((node) => {
    listGraph.addNode(node);
});
[[1, 2, 3], [2, 3, 4], [3, 5], [4, 5]].forEach((nodes) => {
    var sourceNode = nodes[0];
    for(var i = 1; i < nodes.length; i++) {
        listGraph.addConnection(sourceNode, nodes[i]);
    }
});

function printPath(path) {
    if (!path || !path.map) {
        console.log("no path");
        return null;
    }
    var pathKeys = path.map((node) => {
        return node.key;
    });
    console.log(pathKeys);
}
printPath(listGraph.BFS(1, 5));
printPath(listGraph.BFS(2, 5));
printPath(listGraph.BFS(2, 3));
printPath(listGraph.BFS(3, 1));