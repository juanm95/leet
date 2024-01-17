/**
palindrome partitioning = an array where each element is a palindrome and combining each element adds up to the input string.

Return all unique partitionings.

Checking if something is a palindrome is O(length of string)
Checking that a palindrome partion is valid is O(n) since the partitions add up to the whole string

Brute force would generate all partitions and check each for validity
O (n * 2^n)

generating partitions

f(partition, index)
    f(add character to last substring, index + 1)
    f(create new substring with just this character, index + 1)

This would take O(2^n) and would generate O(2^n) partitions

If I knew how long my partition was going to be, I could check it ahead of time.
I could also check if the last partition is a valid partition as a shortcut.

Worst case time complexity doesn't really change though.

Example: "abc" expect: ["a", "b", "c"], ["abc"], ["ab", "c"], ["a", "bc"]

output: [[abc], [ab, c], [a, bc], [a, b, c]]
f([], [], 0)
    f([], [a], 1)
        f([], [ab], 2)
            f([], [abc], 3)
            f([ab], [c], 3)
        f([a], [b], 2)
            f([a], [bc], 3)
            f([a, b], [c], 3)
    f([])
function generatePartitions(partition, newSubString, index) {
    if (index === s.length) {
        if (newSubString.length > 0) {
            partition.push(newSubString.join(""))
            allPartitions.push([...partition]);
            partition.pop();
        }

        allPartitions.push([...partition]);
        return;
    }

    newSubString.push(s[index]);
    generatePartitions(partition, newSubString, index + 1);
    newSubString.pop();

    partition.push(newSubString.join(""));
    generatePartitions(partition, [s[index]], index + 1);
    partition.pop();
}

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
    function generatePartitions(partition, newSubString, index) {
        if (index === s.length) {
            if (newSubString.length > 0) {
                // Need to push AND pop to partition because the parent won't know that I pushed to it
                partition.push(newSubString.join(""))
                allPartitions.push([...partition]);
                partition.pop();
            } else {
                allPartitions.push([...partition]);
            }

            return;
        }

        // Add to existing string
        newSubString.push(s[index]);
        generatePartitions(partition, newSubString, index + 1);
        newSubString.pop();

        // Create new string
        if (newSubString.length > 0) {
            partition.push(newSubString.join(""));
            generatePartitions(partition, [s[index]], index + 1);
            partition.pop();
        }
    }

    generatePartitions([], [], 0);

    let output = [];
    allPartitions.forEach((partition) => {
        for (let i = 0; i < partition.length; i++) {
            if (!isPalindrome(partition[i])) {
                return;
            }
        }
        output.push(partition);
    })

    return output;
};