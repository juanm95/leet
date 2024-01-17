/**
This solution has even better theoretical space complexity because I'm not 
creating new arrays at each step and only when I need to add to the output.
Leetcode however didn't seem to show a difference. Maybe because either way
the stack adds space each time and the intermediary arrays get cleaned up 
along the way.
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
    function backtrack(pathSoFar, index) {
        if (index === nums.length) {
            output.push([...pathSoFar])
            return;
        }

        pathSoFar.push(nums[index]);
        backtrack(pathSoFar, index + 1)
        pathSoFar.pop()
        // Slicepoint is the index at which the new candidates array will start.
        // If we need to skip the rest of the elements in the array, slicepoint should equal the array length.
        let slicePoint = index + 1;
        while (slicePoint < nums.length && nums[slicePoint] === nums[slicePoint - 1]) {
            slicePoint++;
        }

        backtrack([...pathSoFar], slicePoint)
    }

    backtrack([], 0);
    return output;
};