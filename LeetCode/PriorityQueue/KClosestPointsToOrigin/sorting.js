/**
This solution uses a max heap instead of minheap so that I can dequeue whenever my size is
exceeding k and thus I always maintain just the k lowest elements in the max heap.

runtime is klogk instead of nlogn, space is k
 */

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    points.sort((a, b) => {
        let distanceA = a[0]**2 + a[1]**2;
        let distanceB = b[0]**2 + b[1]**2;

        return distanceA - distanceB;
    });

    return points.slice(0, k);
};