const fs = require('fs');
fs.readFile('./input8.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  var lines = inputToLineByLine(data);
  var grid = linesToGrid(lines);
  var maxScore = maxScenicScore(grid);
  console.log(maxScore);
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

function maxScenicScore(grid) {
    var maxScore = 0;
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[0].length; col++) {
            var coordinateScore = calculateScenicScore(grid, row, col);
            if (coordinateScore > maxScore) {
                maxScore = coordinateScore;
            }
        }
    }
    return maxScore;
}

function calculateScenicScore(grid, row, col) {
    var upScore = calculateScore(grid, row, col, true, -1);
    var downScore = calculateScore(grid, row, col, true, 1);
    var rightScore = calculateScore(grid, row, col, false, 1);
    var leftScore = calculateScore(grid, row, col, false, -1);


    return upScore * downScore * rightScore * leftScore;
}

function calculateScore(grid, row, col, movingRow, step) {
    var height = grid[row][col];
    var score = 0;
    while(true) {
        if (movingRow) {
            row += step;
            if (row < 0 || row >= grid.length) {
                return score;
            }
        }
        if (!movingRow) {
            col += step;
            if (col < 0 || col >= grid[0].length) {
                return score;
            }
        }
        score += 1;
        if (height <= grid[row][col]) {
            return score;
        }
    }
}