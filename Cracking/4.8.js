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
    left; right; height = 1; parent;
    constructor(data) {
        this.data = data;
    }
}

function leftChildParent(node) {
    if (node.left) node.left.parent = node;
}

function rightChildParent(node) {
    if (node.left) node.left.parent = node;
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
        leftChildParent(node);
        newRoot.right = node;
        rightChildParent(newRoot);
        node.height = this.calculateNewHeight(node);
        newRoot.height = this.calculateNewHeight(newRoot);
        return newRoot;
    }

    rotateLeft(node) {
        var newRoot = node.right;
        node.right = newRoot.left;
        rightChildParent(node);
        newRoot.left = node;
        leftChildParent(newRoot);
        node.height = this.calculateNewHeight(node);
        newRoot.height = this.calculateNewHeight(newRoot);
        return newRoot;
    }

    insertHelper(node, data) {
        // Base case, just return a new node, the calling function will then put that node in the right place.
        if (node == null) return new TreeNode(data);

        if (data > node.data) {
            node.right = this.insertHelper(node.right, data);
            rightChildParent(node);
        } else {
            node.left = this.insertHelper(node.left, data);
            leftChildParent(node);
        }

        node.height = this.calculateNewHeight(node);
        var balance = this.balance(node);
        if (balance > 1) {
            if (this.balance(node.left) == -1) {
                node.left = this.rotateLeft(node.left);
                leftChildParent(node);
            }
            return this.rotateRight(node);
        }
        if (balance < -1) {
            if (this.balance(node.right) == 1) {
                node.right = this.rotateRight(node.right);
                rightChildParent(node);
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
                leftChildParent(node);
            }
            return this.rotateRight(node);
        }
        if (balance < -1) {
            if (this.balance(node.right) == 1) {
                node.right = this.rotateRight(node.right);
                rightChildParent(node);
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
            rightChildParent(node);
        } else if (data < node.data) {
            // stuff under this node is changing, we gotta rebalance it later.
            node.left = this.deleteHelper(node.left, data);
            leftChildParent(node);
        } else {
            if (node.left && node.right) {
                node.data = this.inorderSuccessor(node).data;
                node.right = this.deleteHelper(node.right, node.data);
                rightChildParent(node)
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

    findNode(data) {
        var node = this.root;
        while (node && node.data != data) {
            if (data > node.data) {
                node = node.right;
            } else {
                node = node.left;
            }
        }
        return node;
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

function getHeight(tree, node) {
    var height = 0;
    while (node != tree.root) {
        node = node.parent;
        height++;
    }
    return height;
}

function getAncestor(node, distance) {
    for (var i = 0; i < distance; i++) {
        if (!node.parent) return null;
        node = node.parent;
    }
    return node;
}

function firstCommonAncestor(tree, node1, node2) {
    var node1Height = getHeight(tree, node1);
    var node2Height = getHeight(tree, node2);
    if (node1Height > node2Height) node1 = getAncestor(node1, node1Height - node2Height);
    if (node2Height > node1Height) node2 = getAncestor(node2, node2Height - node1Height);
    while (node1 != node2 && node1 != null && node != null) {
        node1 = node1.parent;
        node2 = node2.parent;
    }
    if (!node1 || !node2) return null;

    return node1;
}

var tree = new AVLTree();
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((element) => {
    tree.insert(element);
});

tree.print();
console.log(firstCommonAncestor(tree, tree.findNode(1), tree.findNode(5)));