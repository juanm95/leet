/**
capture regions that are 4 directionally surrounded.

Edges are NOT Xs

General procedure
Find an O
Check if it's surrounded by all Xs
If it has an O next to it, check if that is surrounded by Xs EXCEPT for the side which I'm inspecting from.

OR find exceptions.

Exceptions are found when an O is chained to an O at the border.

I could start form the border, and mark things as Os. Then go through.

seen = matrix

for each cell
    if cell has been seen
        skip it
    traverse starting at this cell

return the board

traverse (cell)
    if X
        return false;
    if at the border
        return true;

    check if any of the 4 sides is chained to an O at the border
        if yes
            don't touch this, return true
        if not
            flip this
 */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    let definitelyO = new Array(board.length).fill(0).map((zeros) => {return new Array(board[0].length).fill(0)});

    function traverse(row, col) {
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return;
        if (board[row][col] === "X") {
            return;
        }
        if (definitelyO[row][col] == 1) return;

        definitelyO[row][col] = 1;
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
            if (board[row][col] === "O" && definitelyO[row][col] == 0) {
                board[row][col] = "X"
            }
        }
    }

    return board;
};