const fs = require('fs');

fs.readFile('./input6.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var firstMarker = getFirstMessage(data);
  console.log(firstMarker);
});

function getFirstMarker(data) {
    for (var i = 3; i < data.length; i++) {
        if (checkIfSignal(data.substring(i - 3, i + 1))) {
            return i + 1;
        }
    }

    return -1;
}

function getFirstMessage(data) {
    for (var i = 13; i < data.length; i++) {
        if (checkIfSignal(data.substring(i - 13, i + 1))) {
            return i + 1;
        }
    }

    return -1;
}

function checkIfSignal(str) {
    var map = {};
    for (char of str) {
        if (map[char]) {
            return false;
        }
        map[char] = true;
    }
    return true;
}