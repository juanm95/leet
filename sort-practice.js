function quickSort(arr, left, right) {
    var index = partition(arr, left, right);
    if (left < index - 1) {
        quickSort(arr, left, index - 1);
    }
    if (right > index) {
        quickSort(arr, index, right)
    }
}

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function partition(arr, left, right) {
    var pivot = arr[Math.floor((left + right) / 2)]; // the value at the midpoint.
    while (left <= right) {
        while(arr[left] < pivot) left++;
        while(arr[right] > pivot) right--;
        if (left <= right) { // if we haven't reached the limit, then arr[left] and arr[right] must be swappable
            swap(arr, left, right);
            left++;
            right--;
        } 
    }
    return left;
}

[[3, 2, 1], [1, 2, 3], [2, 1, 3]].forEach((arr) => {
    quickSort(arr, 0, arr.length - 1);
    console.log(arr);
})