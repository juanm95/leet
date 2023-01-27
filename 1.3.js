var testCases = [
    ["Mr John Smith    ".split(""), 13, "Mr%20John%20Smith"]
]

function urlify(array, len) {
    var writePtr = array.length - 1;
    for (var i = len - 1; i > -1; i--) {
        if (array[i] == " ") {
            array[writePtr] = "0";
            array[writePtr - 1] = "2";
            array[writePtr - 2] = "%";
            writePtr -= 3;
        } else {
            array[writePtr] = array[i];
            writePtr--;
        }
    }

    return array.join("");
}

function validate(func) {
    testCases.forEach((testCase) => {
        var result = func(testCase[0], testCase[1]);
        if (result != testCase[2]) {
            console.log(`${result}`);
        }
    })
}

validate(urlify);