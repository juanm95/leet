const fs = require('fs');

fs.readFile('./input7.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  var lines = inputToLineByLine(data);
  var tree = createTree(lines);
  var qualifyingSizes = [];
  var total = calculateTotalSizes(tree, qualifyingSizes);
  var spaceNeeded = total + 30000000 - 70000000;
  qualifyingSizes.sort((a, b) => {
    if (1*a > 1*b) {
        return 1;
    }
    return -1;
  });
  var deletionSize = qualifyingSizes.forEach((value) => {
    if (value >= spaceNeeded) {
        return value;
    }
  });
  console.log(deletionSize);
});

function inputToLineByLine(input) {
    return input.split("\n");
}

function createTree(lines) {
    var root;
    var currentNode = { children: {} };
    for (line of lines) {
        line = line.split(" ");
        if (line[0] === "$") {
            if (line[1] === "cd") {
                if (line[2] == "..") {
                    currentNode = currentNode.parent;
                } else {
                    currentNode.children[line[2]] = {
                        parent: currentNode,
                        children: {}
                    };
                    currentNode = currentNode.children[line[2]];
                    if (!root) {
                        root = currentNode;
                        root.parent = null;
                    }
                }
            } else {
                // no op
            }
        } else {
            if (line[0] == "dir") {
                // no op, I think this is fine since we have to visit it.
            } else {
                currentNode.children[line[1]] = { size: 1*line[0], parent: currentNode };
            }
        }
    }
    return root;
}

function calculateTotalSizes(tree, qualifyingSizes) {
    if (!tree.children) {
        return tree.size;
    }
    var childSizes = 0;
    if (tree.children) {
        for (child of Object.values(tree.children)) {
            childSizes += calculateTotalSizes(child, qualifyingSizes);
        }
        qualifyingSizes.push(childSizes);
    }
    return childSizes;
}