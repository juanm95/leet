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
    left; right;
    constructor(data) {
        this.data = data;
    }
}

class AVLTree {
    root;
    constructor() {
    }

    insert(num) {
        if (!this.root) {
            this.root = new TreeNode(num);
        } else {
            var node = this.root;
            while (node) {
                if (num > node.data) {
                    if (node.right) {
                        node = node.right;
                    } else {
                        node.right = new TreeNode(num);
                        break;
                    }
                } else {
                    if (node.left) {
                        node = node.left;
                    } else {
                        node.left = new TreeNode(num);
                        break;
                    }
                }
            }
        }
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