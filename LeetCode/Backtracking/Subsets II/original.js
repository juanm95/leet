/**
duplicates. sort + look back?
how is this different from combinations?
sets can be of any size.
there's potential for memoization
problem size is quite small

[], [1, 1] expect [], [1], [1, 1]
Backtrack with 1 f([1], [1])
    f([1, 1], [])
    f([1], [])
Backtrack with 1 not in f([], [1])
    if (last element != this element) f([1], [])
    f([], [])

Backtrack
sort
outputArray
backtracking func (path so far, candidates)
    if no more candidates
        add to output
        return
    
    backtrack (path so far + next candidate, candidates - candidate)
    backtrack (path so far, candidates - candidates)

backtracking([], sortedCandidates)
return outputArray

O(nlogn + 2^n)

 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    let added = new Set();
    nums.sort((a, b) => {
        return a - b;
    })
    let output = [];
    function backtrack(pathsSoFar, candidates) {
        if (candidates.length === 0) {
            let pathsSoFarString = pathsSoFar.toString();
            if (!added.has(pathsSoFarString)) {
                added.add(pathsSoFarString);
                output.push(pathsSoFar)
            }
            
            return;
        }

        backtrack([...pathsSoFar, candidates[0]], [...candidates.slice(1)])
        backtrack([...pathsSoFar], [...candidates.slice(1)])
    }

    backtrack([], nums);
    return output;
};