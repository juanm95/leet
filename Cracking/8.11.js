function coinsH(n, memo, denoms) {
    if (n == 0) return 1;
    if (memo[n]) return memo[n];
    var ways = 0;
    denoms.forEach((denom) => {
        if (n >= denom) {
            ways += coinsH(n - denom, memo, denoms);
        }
    })
    memo[n] = ways;
    return ways;
}

function coins(n) {
    var memo = new Array(n).fill(0);
    var denoms = [25, 10, 5, 1];
    return coinsH(n, memo, denoms);
}

function makeChangeH(amount, denoms, index, map) {
    if (map[amount][index] > 0) {
        return map[amount][index];
    }
    if (index >= denoms.length - 1) return 1;
    var denomAmount = denoms[index];
    var ways = 0;
    for (var i = 0; i * denomAmount <= amount; i++) {
        var amountRemaining = amount - i * denomAmount;
        ways += makeChangeH(amountRemaining, denoms, index + 1, map);
    }
    map[amount][index] = ways;
    return ways;
}

function makeChange(n) {
    var denoms = [25, 10, 5, 1];
    var matrix = new Array(n + 1).fill(0); // Without a fill, the following forEach does not actually run.
    matrix.forEach((element, index) => {
	    matrix[index] = new Array(denoms.length);
    });
    return makeChangeH(n, denoms, 0, matrix);
}

console.log(makeChange(100));
console.log(coins(100));