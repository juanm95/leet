const fs = require('fs');

fs.readFile('./input5.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = inputToLineByLine(data);
  const numberStart = findLineWithNumbers(lines);
  var arrayOfStacks = generateStartState(lines, numberStart);
  moveBoxes(lines, arrayOfStacks, numberStart)
  console.log(outputTops(arrayOfStacks));
});

function inputToLineByLine(input) {
    return input.split("\n");
}

function lineHasBoxes(line) {
    return line.includes("[");
}

function findLineWithNumbers(lines) {
    for (var i = 0; i < lines.length; i++) {
        if (!lineHasBoxes(lines[i])) {
            return i;
        }
    }
    return -1;
}

// only works for single number and character
function generateStartState(lines, numberStart) {
    const numbersLine = lines[numberStart];
    const arrayOfStacks = [[]];
    for (var col = 0; col < numbersLine.length; col++) {
        var character = numbersLine[col];
        if (isNumber(character)) {
            arrayOfStacks.push(getStack(lines, numberStart, col));
        }
    }
    return arrayOfStacks;
}

function getStack(lines, numberStart, col) {
    var stack = [];
    for (var row = numberStart - 1; row > -1; row--) {
        var character = lines[row][col];
        if (character != " ") {
            stack.push(character);
        }
    }
    return stack;
}

function isNumber(character) {
    return character != " ";
}

function moveBoxes(lines, stacks, numberStart) {
    for (var row = numberStart + 2; row < lines.length; row++) {
        executeInstruction(lines[row], stacks, false);
    }
}

function executeInstruction(line, stacks, oneAtATime) {
    var instructionArray = line.split(" ");
    var amount = instructionArray[1];
    var source = instructionArray[3];
    var destination = instructionArray[5];
    if (oneAtATime) {
        moveOneAtATime(stacks, amount, source, destination);
    } else {
        moveAndKeepOrder(stacks, amount, source, destination);
    }
}

function moveOneAtATime(stacks, amount, source, destination) {
    for (var i = 0; i < amount; i++) {
        var character = stacks[source].pop();
        stacks[destination].push(character);
    }
}

function moveAndKeepOrder(stacks, amount, source, destination) {
    var intermediateArray = []
    for (var i = 0; i < amount; i++) {
        var character = stacks[source].pop();
        intermediateArray.push(character);
    }
    for (var i = 0; i < amount; i++) {
        var character = intermediateArray.pop();
        stacks[destination].push(character)
    }
}

function outputTops(stacks) {
    var tops = "";
    for (stack of stacks) {
        if (stack.length > 0) {
            tops += stack[stack.length - 1];
        }
    }
    return tops;
}