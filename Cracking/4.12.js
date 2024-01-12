class TreeNode {
    data; right; left;
    constructor(initData) {
        this.data = initData;
    }
}

var root = new TreeNode(10);
root.right = new TreeNode(10);
root.right.left = new TreeNode(-3);
root.right.left.left = new TreeNode(-10);
root.right.left.left.left = new TreeNode(8);

function pathsWithSum(tree, sum) {
    return pathsWithSumHelper(tree, sum, 0, {})
}

function pathsWithSumHelper(node, targetSum, runningSum, pathCount) {
    if (node == null) return 0;

    runningSum += node.data;
    var sum = runningSum - targetSum;
    var totalPaths = pathCount[sum] || 0;

    if (runningSum == targetSum) {
        totalPaths++;
    }

    incrementPaths(pathCount, runningSum, 1);
    totalPaths += pathsWithSumHelper(node.left, targetSum, runningSum, pathCount);
    totalPaths += pathsWithSumHelper(node.right, targetSum, runningSum, pathCount);
    incrementPaths(pathCount, runningSum, -1);

    return totalPaths
}

function incrementPaths(paths, key, delta) {
    var value = paths[key] || 0;
    paths[key] = value + delta;
    if (paths[key] == 0) {
        delete paths[key];
    }
}

console.log(pathsWithSum(root, 8));