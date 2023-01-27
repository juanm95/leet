function zeroMatrix(matrix) {
    var clearFirstRow = false;
    var clearFirstCol = false;
    for (var row = 0; row < matrix.length; row++) {
        for (var col = 0; col < matrix[0].length; col++) {
            if (matrix[row][col] == 0) {
                if (row == 0) {
                    clearFirstRow = true;
                }
                if (col == 0) {
                    clearFirstCol = true;
                }
                matrix[0][col] = 0;
                matrix[row][0] = 0;
            }
        }
    }

    for (var row = 1; row < matrix.length; row++) {
        if (matrix[row][0] == 0) {
            matrix[row].fill(0);
        }
    }
    for (var col = 1; col < matrix.length; col++) {
        if (matrix[0][col] == 0) {
            for (var row = 0; row < matrix.length; row++) {
                matrix[row][col] = 0;
            }
        }
    }
    if (clearFirstRow) {
        matrix[0].fill(0);
    }
    if (clearFirstCol) {
        for (var row = 0; row < matrix.length; row++) {
            matrix[row][0] = 0;
        }
    }

    return matrix;
}

var testCase1 = [
    [1, 2, 3],
    [4, 0, 5],
    [6, 7, 8],
    [9, 10, 11]
];

var testCase2 = [
    [0, 1, 2],
    [3, 4, 5]
];

var testCase3 = [
    [1, 2, 0],
    [0, 3, 4],
    [5, 6, 7]
];

console.log(zeroMatrix(testCase1));
console.log(zeroMatrix(testCase2));
console.log(zeroMatrix(testCase3));