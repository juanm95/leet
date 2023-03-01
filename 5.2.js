function printBinary(num) {
    if (num >=1 || num <= 0) return "Error";
    var binary = "";
    binary = binary + ".";
    while (num > 0) {
        if (binary.length >= 31) return "Length Error";
        r = num * 2;
        if (r >= 1) {
            binary+="1";
            num = r - 1;
        } else {
            binary+="0";
            num = r;
        }
    }
    return binary;
}

console.log(printBinary(.8));