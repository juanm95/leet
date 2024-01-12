function isUnique(str) {
    var characterArray = str.split("");
    var seenCharacters = {};
    for (var i = 0; i <  characterArray.length; i++) {
        var ch = characterArray[i];
        if (seenCharacters[ch]) {
            return false;
        } else {
            seenCharacters[ch] = true;
        }
    }

    return true;
}

function isUniquePointer(str) {
    for (var firstPointer = 0; firstPointer < str.length; firstPointer++) {
        for (var secondPointer = firstPointer + 1; secondPointer < str.length; secondPointer++) {
            if (str.charAt(firstPointer) === str.charAt(secondPointer)) {
                return false;
            }
        }
    }
    return true;
}

function isUniqueSort(str) {
    var sorted = str.split("").sort();
    for (var i = 0; i < sorted.length - 1; i++) {
        if (sorted[i] == sorted[i + 1]) {
            return false;
        }
    }
    return true;
}

function isUniqueArray(str) {
    var array = new Array(256);
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (array[charCode]) {
            return false;
        }
        array[charCode] = true;
    }
    return true;
}

function isUniqueBitVector(str) {
    var bitVector = 0;
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (bitVector >> charCode && 1) {
            return false;
        }
        bitVector = bitVector | 1 << charCode;
    }
    return true;
}

console.log(isUnique("abcd"));
console.log(isUnique("aaaa"));

console.log(isUniquePointer("abcd"));
console.log(isUniquePointer("aaaa"));

console.log(isUniqueSort("abcd"));
console.log(isUniqueSort("aaaa"));

console.log(isUniqueArray("abcd"));
console.log(isUniqueArray("aaaa"));

console.log(isUniqueBitVector("abcd"));
console.log(isUniqueBitVector("aaaa"));