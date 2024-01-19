/**
point x, y
integer k
return the k closest points to the origin.

Use a min heap
for each point, calculate the distance to the origin using the provided formula
then pop out k points.

My min heap can also just take in the operation as a function.

I can save on space as well by only storing the top k elements, but my implementation I don't think has that automatically.
 */

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    let minHeap = new MinPriorityQueue({
        priority: (point) => {
            return ((point[0])**2 + (point[1]**2))**(1/2);
        }
    });
    points.forEach((point) => {
        minHeap.enqueue(point);
    })
    let answer = [];
    for (let i = 0; i < k; i++) {
        answer.push(minHeap.dequeue().element);
    }

    return answer;
};