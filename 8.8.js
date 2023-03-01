function permWithDups(str) {
    var freq = buildFreq(str);
    return permWithDupsH(freq, "", str.length);
}

function permWithDupsH(freq, prefix, remaining, results = []) {
    if (remaining == 0) {
        results.push(prefix);
        return results;
    }
    Object.keys(freq).forEach((char) => {
        if (freq[char]) {
            freq[char] -= 1;
            permWithDupsH(freq, prefix + char, remaining - 1, results);
            freq[char] += 1;
        }
    });
    return results;
}

function buildFreq(str) {
    var freq = {};
    str.split("").forEach((char) => {
        if (freq[char] == undefined) {
            freq[char] = 0;
        }
        freq[char] += 1;
    });
    return freq;
}

console.log(permWithDups("aaaaa"))