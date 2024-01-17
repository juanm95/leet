/**
input: grid, word
output: true or false
Special consideration: can't go back to a previously used word
Could store each used space in a set

General algo:

Create set

define search(index, row, col)
    if row, col in set
        return false
    if row, col not in bounds
        return false
    if character at row, col doesn't match character at index in word
        return false
    if index === word.length - 1
        return true
    
    add row, col to set
    for each direction
        if (search(index + 1, new row, new col)) 
            return true;
    remove row, col from set
    return false;

For each row, col
    if (search(0, row, col)) {
        return tru;e
    }

return false;

Could do a check to make sure enough of each character exist.
Could do a memoization step where I store index and row, col to avoid duplicate search.
This reduces it by potential 3 or 2

 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    // check for if it's possible to make the word
    let frequencyMap = {};
    for (let i = 0; i < word.length; i++) {
        frequencyMap[word[i]] |= 0;
        frequencyMap[word[i]] += 1;
    }
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            let char = board[row][col];
            if (frequencyMap[char]) {
                frequencyMap[char]--;
                if (frequencyMap[char] == 0) {
                    delete frequencyMap[char];
                }
            }
        }
    }
    if (Object.entries(frequencyMap).length > 0) {
        return false;
    }

    let set = new Set();
    function search(index, row, col) {
        let setString = [row, col].toString();
        if (set.has(setString)) {
            return false;
        }
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
            return false;
        }
        if (board[row][col] !== word[index]) {
            return false;
        }
        if (index === word.length - 1) {
            return true;
        }
        
        set.add(setString);

        let anyTrue = (
            search(index + 1, row, col + 1) ||
            search(index + 1, row, col - 1) ||
            search(index + 1, row + 1, col) ||
            search(index + 1, row - 1, col)
        );

        set.delete(setString);
        return anyTrue;
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (search(0, row, col)) {
                return true;
            }
        }
    }

    return false;
};