/**
Subject: backtracking, so should be straight forward.
Take each integer, pop it into a stack

Put everything into a set.

forEach O(n)
    add element to list O(1)
    remove from set
    recurse
    remove element from list
    add element back to set

Could probably memoize
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let output = [];
    function backTracking(possibleNums, path) {
        if (possibleNums.length === 0) {
            output.push([...path]);
            return;
        }
        for (let i = 0; i < possibleNums.length; i++) {
            backTracking(possibleNums.slice(0, i).concat(possibleNums.slice(i + 1)), path.concat(possibleNums[i]));
        }
    }

    backTracking(nums, [])

    return output;
};