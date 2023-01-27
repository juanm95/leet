function checkPermutation(str1, str2) {
    if (str1.length != str2.length) {
        return false;
    }

    var array = new Array(256);
    array.fill(0);
    for (var i = 0; i < str1.length; i++) {
        array[str1.charCodeAt(i)] += 1;
    }

    for (var i = 0; i < str1.length; i++) {
        if (array[str2.charCodeAt(i)] == 0) {
            return false;
        }
        array[str2.charCodeAt(i)] -= 1;
    }

    return true;
}

var testCases = [{
    input: {
        str1: "abc",
        str1: "cab"
    },
    output: true
},
{
    input: {
        str1: "aaa",
        str2: "abc"
    },
    output: false
},
{
    input: {
        str1: "",
        str2: " "
    },
    output: false
}];

function validator(func, name) {
    testCases.forEach((testCase) => {
        var result = func(testCase.input.str1, testCase.input.str2);
        if (result != testCase.output) {
            console.log(`${name} gave ${result} for input ${testCase.input.str1} and ${testCase.input.str2} but expected ${testCase.output}`);
        }
    })
}

validator(checkPermutation, "arrays");

