function searchH(arr, start, end, element) {
    var midPoint = Math.floor((start + end) / 2);
    if (arr[midPoint] == element) return midPoint;
    if (arr[start] == arr[midPoint] && arr[midPoint] == arr[end - 1]) {
        return searchH(s)
    }
    if (arr[start] < arr[midPoint]) { // left is sorted properly.
        if (arr[midPoint] > element && arr[start] < element) { // element would be in left;
            return searchH(arr, start, midPoint);
        } else {
            return searchH(arr, midPoint + 1, end, element);
        }
    } else { // right is sorted properly.
        if (arr[midPoint] < element && arr[end - 1] > element) { // element is in the right;
            return searchH(arr, midPoint, end);
        } else {
            return searchH(arr, start, midPoint);
        }
    }

    return null;
}

function search(arr, element) {
    return searchH(arr, 0, arr.length - 1, element);
}

[1, 2, 3, 4, 5]
[30, 40, 50, 10, 20]

[1, 2, 2, 2, 2]
[2, 1, 2, 2, 2]
[2, 2, 2, 1, 2]