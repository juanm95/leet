const fs = require('fs');
var countedTrees = {};
fs.readFile('./input8.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  var lines = inputToLineByLine(data);
  var grid = linesToGrid(lines);
  var fromLeft = countEdge(grid, rowIterator, columnIterator, true);
  var fromRight = countEdge(grid, rowIterator, backwardsColumnIterator, true);
  var fromTop = countEdge(grid, columnIterator, rowIterator, false);
  var fromBottom = countEdge(grid, columnIterator, backwardsRowIterator, false);

  console.log(fromLeft + fromRight + fromTop + fromBottom);
});

function inputToLineByLine(input) {
    return input.split("\n");
}

function linesToGrid(lines) {
    var grid = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split("");
        grid.push(line.map((character) => 1*character));
    }

    return grid;
}

function countEdge(grid, outerGenerator, innerGenerator, outerIsRow) {
    var totalTrees = 0;
    var outerIterator = outerGenerator(grid);
    var outer = outerIterator.next();
    while (!outer.done) {
        var innerIterator = innerGenerator(grid);
        var inner = innerIterator.next();
        var visibleHeight = -1;
        while (!inner.done) {
            var row = outerIsRow ? outer.value : inner.value;
            var col = outerIsRow ? inner.value : outer.value;
            var height = grid[row][col];
            if (height > visibleHeight) {
                visibleHeight = height;
                if (!countedTrees[row]) {
                    countedTrees[row] = {};
                }
                if (!countedTrees[row][col]) {
                    totalTrees++;    
                }
                countedTrees[row][col] = true;
            }
            inner = innerIterator.next();
        }
        outer = outerIterator.next();
    }
    return totalTrees;
}

function* rowIterator(grid) {
    for (var i = 0; i < grid.length; i++) {
        yield i;
    }
}

function* backwardsRowIterator(grid) {
    for (var i = grid.length - 1; i >= 0; i--) {
        yield i;
    }
}

function* columnIterator(grid) {
    for (var i = 0; i < grid[0].length; i++) {
        yield i;
    }
}

function* backwardsColumnIterator(grid) {
    for (var i = grid[0].length - 1; i >= 0; i--) {
        yield i;
    }
}