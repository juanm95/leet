// Implement AVL
// Implement Priority Queue
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

    deleteHelper(node, data) {
        if (node == null) return null;

        if (data > node.data) {
            this.deleteHelper(node.right, data);
        } else if (data < node.data) {
            this.deleteHelper(node.left, data);
        } else {
            
        }
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

var tree = new AVLTree();
[5, 3, 2, 1, 6, 8, 0].forEach((elem) => {
    tree.insert(elem);
});
tree.print();