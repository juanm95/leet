/**
This optimizes on space complexity by using the input board as a place to note when something should definitely be an O in the output because it's connected to the border. That is noted with switching the O to a T and then cleaning that up later.
 */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {

    function traverse(row, col) {
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return;
        if (board[row][col] === "X") {
            return;
        }
        if (board[row][col] == "T") return;

        board[row][col] = "T";
        traverse(row + 1, col);
        traverse(row - 1, col);
        traverse(row, col + 1);
        traverse(row, col - 1);
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (board[row][col] === "O" && definitelyO[row][col] == 0 && (row == 0 || row == board.length - 1 || col == 0 || col == board[0].length - 1)) {
                traverse(row, col)
            }
        }
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (board[row][col] === "O") {
                board[row][col] = "X"
            }
            if (board[row][col] === "T") {
                board[row][col] = "O"
            }
        }
    }

    return board;
};