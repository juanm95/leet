/**
grid
0, 1, 2

count minutes until all rot, if that's impossible, return -1.

Impossible if a 1 is surrounded by 0s, walls and an impossible to rot 1.
In other words. It's possible if all 1s are connected in some way to a rotting orange.

If it's not impossible
I can try looking at each rotten orange and get the furthest fresh orange, and then get the max of the furthest fresh orange of each rotten orange.
that won't work though if two rotten oranges working together makes it faster.

I could try it via brute force.

Progressing the rotting step is m*n
Checking for all rotten is m*n

I would do this up to "answer" times which is at most m+n so O((m+n)m*n) or O(m^2n + mn^2)

Could do for each fresh orange, what's the closest rotten orange to it
Do this for each fresh orange and get the largest number

Worst case for an orange is O(m*n)
Could do this O(m*n) times

Could also queue up each rotten orange, then at each step if there's a fresh orange near a rotten orange, I queue that orange up. Keep expanding outwards until there's no more new rotten oranges.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    let rottenOrangeQueue = [];
    let queueIndex = 0;
    let flippedAFresh = false;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === 2) {
                rottenOrangeQueue.push({row, col});
            }
        }
    }

    let minutes = 0; // Example: [1, 2, 3, 4]
    while (queueIndex < rottenOrangeQueue.length) { // queueIndex = 2
        flippedAFresh = false;
        let minuteEnd = rottenOrangeQueue.length; // 4
        while (queueIndex < minuteEnd) {
            let {row, col} = rottenOrangeQueue[queueIndex]; // 2
            queueIndex++;
            [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]].forEach(([neighborRow, neighborCol]) => {
                if (neighborRow >= 0 && neighborRow < grid.length && neighborCol >= 0 && neighborCol < grid[0].length) {
                    if (grid[neighborRow][neighborCol] == 1) {
                        flippedAFresh = true;
                        grid[neighborRow][neighborCol] = 2;
                        rottenOrangeQueue.push({row: neighborRow, col: neighborCol});
                    }
                }
            });
        }
        if (flippedAFresh) minutes++;
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === 1) {
                return -1;
            }
        }
    }
    return minutes;
};