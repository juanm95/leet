function riag(grid, r, c) {
    var memo = Array(grid.length).fill(0);
    memo.forEach((element, index) => {
        memo[index] = Array(grid[0].length).fill("");
    });
    memo[0][0] = 0;
    riagHelper(r - 1, c - 1, grid, memo);
    return memo[0][0];
}

function riagHelper(row, col, grid, memo) {
    memo[0][0]++;
    if (row == 0 && col == 0) return true;
    if (row < 0 || col < 0) return false;
    if (!grid[row][col]) return false;
    if (memo[row][col]) return true;
    if (memo[row][col] === false) return false;
    if (riagHelper(row - 1, col, grid, memo)) {
        memo[row][col] = memo[row - 1][col] + "d";
        return true;
    }
    if (riagHelper(row, col - 1, grid, memo)) {
        memo[row][col] = memo[row][col - 1] + "r";
        return true;
    }
    memo[row][col] = false;
    return false;
}

var grid = [
    [true, true, true, true],
    [true, false, true, true],
    [true, true, true, false],
    [true, true, false, true],
    [false, true, true, true],
    [true, true, true, true],
    [true, false, true, true],
    [true, true, true, false],
    [true, true, false, true],
    [false, true, true, true],
    [true, true, true, true],
    [true, false, true, true],
    [true, true, true, false],
    [true, true, false, true],
    [false, true, true, true]
]

console.log(riag(grid, 15, 4));