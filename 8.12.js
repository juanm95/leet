function getDiag1(row, col) {
    return row + col;
}

function getDiag2(row, col) {
    return 7 + row - col;
}

function eightQueensH(queens, row, cols, diag1Array, diag2Array) {
    if (row == 8) {
        queens.push([ ...cols ]);
    }
    cols.forEach((colValue, col) => {
        if (colValue == -1) {
            var diag1 = getDiag1(row, col);
            var diag2 = getDiag2(row, col);
            if (!diag1Array[diag1] && !diag2Array[diag2]) {
                cols[col] = row;
                diag1Array[diag1] = true;
                diag2Array[diag2] = true;
                eightQueensH(queens, row + 1, cols, diag1Array, diag2Array);
                cols[col] = -1;
                diag1Array[diag1] = false;
                diag2Array[diag2] = false;
            }
        }
    })
}

function eightQueens() {
    var queens = [];
    var cols = new Array(8).fill(-1);
    var diag1 = new Array(15).fill(false);
    var diag2 = new Array(15).fill(false);
    eightQueensH(queens, 0, cols, diag1, diag2)
    return queens;
}

console.log(JSON.stringify(eightQueens()));