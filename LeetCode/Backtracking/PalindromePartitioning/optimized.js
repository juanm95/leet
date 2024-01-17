/**
This version is optimized further to avoid going too far down paths by checking isPalindrome when I add a string to my list instead of waiting until the end.
 */

function isPalindrome(str) {
    let start = 0;
    let end = str.length - 1;
    while (start < end) {
        if (str[start] !== str[end]) {
            return false;
        }
        start++;
        end--;
    }

    return true;
}

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    let allPartitions = [];
    function generatePartitions(partition, index) {
        if (index === s.length) {
            allPartitions.push([...partition]);
            return;
        }

        for (let subStringEnd = index + 1; subStringEnd <= s.length; subStringEnd++) {
            let potentialPalindrome = s.slice(index, subStringEnd);
            if (isPalindrome(potentialPalindrome)) {
                partition.push(potentialPalindrome);
                generatePartitions(partition, subStringEnd);
                partition.pop();
            }
        }
    }

    generatePartitions([], 0);

    return allPartitions;
};