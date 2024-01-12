function sortedMerge(bigArray, smallArray) {
    var bigArrayIndex = bigArray.length - smallArray.length - 1;
    var smallArrayIndex = smallArray.length - 1;
    var writeIndex = bigArray.length - 1;
    while (smallArrayIndex >= 0) {
        if (bigArray[bigArrayIndex] > smallArray[smallArrayIndex]) {
            bigArray[writeIndex] = bigArray[bigArrayIndex];
            bigArrayIndex--;
        } else {
            bigArray[writeIndex] = smallArray[smallArrayIndex];
            smallArrayIndex--;
        }
        writeIndex--;
    }
}

var big = [1, 3, 5, 7, 9, undefined, undefined, undefined];
var small = [2, 4, 6];

sortedMerge(big, small);
console.log(big);

[1, 2, 3, 4]
[3, 4, 1, 2]

midPoint = 1
rotation = 2
midPointReal = (midPoint + rotation) % length
