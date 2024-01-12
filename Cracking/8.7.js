function permutationsWithoutDups(str) {
    var permutations = [];
    if (str.length == 1) {
        return [str];
    }
    if (str.length == 0) {
        return [];
    }
    var char = str.charAt(0);
    var subPerm = permutationsWithoutDups(str.slice(1));
    subPerm.forEach((perm) => {
       for (var i = 0; i < perm.length; i++) {
        permutations.push(perm.slice(0, i) + char + perm.slice(i));
       }
       permutations.push(perm + char);
    });
    return permutations;
}

console.log(permutationsWithoutDups("abcd"));