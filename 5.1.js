function createBinaryString (nMask) {
    // nMask must be between -2147483648 and 2147483647
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
         nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return sMask;
}

function clearMultiple(num, i, j) {
    var start1s = (1 << i) - 1;
    console.log(createBinaryString(start1s));
    var end1s = ~(-1 >>> (31 - j));
    console.log(createBinaryString(end1s));
    var middle0s = start1s | end1s;
    console.log(createBinaryString(middle0s));
    console.log(createBinaryString(num));
    return num & middle0s;
}

function insertion(M, N, i, j) {
    var cleared = clearMultiple(N, i, j);
    return (M << i) | cleared;
}

function createBinaryString (nMask) {
    // nMask must be between -2147483648 and 2147483647
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
         nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return sMask;
  }

var N = 0b10000000;
var M = 0b10011;
var result = insertion(M, N, 2, 6);
console.log(createBinaryString(result));
[~0, -1, ~(-1 >>> 31 - 2), -1 << 2].forEach((num) => {
    console.log(createBinaryString(num));
})