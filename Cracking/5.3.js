function getBit(num, i) {
    return (num & (1 << i)) != 0;
}

function flipToWin(num) {
    var continued = 0;
    var current = 0;
    var greatest = 0;
    for (var i = 0; i < 32; i++) {
        if (getBit(num, i)) {
            continued++;
            current++;
        } else {
            continued = current + 1;
            current = 0;
        }
        if (continued > greatest) greatest = continued;
    }
    return greatest;
}

console.log(flipToWin(1775));