/**
distinct integers

nonnegative k, so can be 0
pairs such that x - y = k
if  none return empty array
order of pairs should be the same.

can't sort, unless we somehow undo it.

x, y are the elements themselves, not the indexes.

x will always be to the right of y

sliding window perhaps
O(n^2)

set 

O(n) time
O(n) space

x - y = k
x = k + y
x - k = y

[0, -1, -2, 2, 1], k = 1
set: 0, -1, -2, 2, 1
pairs: [[1, 0], [0, -1]]
y: -1

input:  arr = [0, -1, -2, 2, 1], k = 1
output: [[1, 0], [0, -1], [-1, -2], [2, 1]]
*/
function findPairsWithGivenDifference(arr, k) {
    let complements = new Set();
    arr.forEach((element) => {
        complements.add(element);
    });
    
    let pairs = []
    arr.forEach((y) => {
      if (complements.has(k + y)) {
        pairs.push([k + y, y]);
      }
    });
    
    return pairs;
  }