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
    let maxHeap = new MaxPriorityQueue({
        priority: (point) => {
            return ((point[0])**2 + (point[1]**2));
        }
    });
    points.forEach((point) => {
        maxHeap.enqueue(point);
        if (maxHeap.size() > k) {
            maxHeap.dequeue();
        }
    })
    let answer = [];
    for (let i = 0; i < k; i++) {
        answer.push(maxHeap.dequeue().element);
    }

    return answer;
};