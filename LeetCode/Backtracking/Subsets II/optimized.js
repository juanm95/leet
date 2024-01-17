/**
This solution uses the sort properly to avoid dups, instead of using a set.
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => {
        return a - b;
    })
    let output = [];
    function backtrack(pathsSoFar, candidates) {
        if (candidates.length === 0) {
            output.push(pathsSoFar)
            return;
        }

        backtrack([...pathsSoFar, candidates[0]], [...candidates.slice(1)])

        // Slicepoint is the index at which the new candidates array will start.
        // If we need to skip the rest of the elements in the array, slicepoint should equal the array length.
        let slicePoint = 1;
        while (slicePoint <= candidates.length && candidates[slicePoint] === candidates[slicePoint - 1]) {
            slicePoint++;
        }

        backtrack([...pathsSoFar], [...candidates.slice(slicePoint)])
    }

    backtrack([], nums);
    return output;
};