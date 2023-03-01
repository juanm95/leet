

function stackable(top, bottom) {
    var dimensions = ["w", "d", "h"];
    for (var i = 0; i < dimensions.length; i++) {
        if (top[dimensions[i]] > bottom[dimensions[i]]) {
            return false;
        }
    }
    return true;
}

function generateStackableMap(boxes) {
    for(var i = 0; i < boxes.length; i++) {
        var bottom = boxes[i];
        bottom.stackable = [];
        for (var j = 0; j < boxes.length; j++) {
            if (i == j) {
                continue;
            }
            var top = boxes[j];
            if (stackable(bottom, top)) {
                bottom.stackable.push(top);
            }
        }
    }
}

function highestStackH(box) {
    if (box.stackHeight) {
        return box.stackHeight;
    }

    var highestSubHeight = 0;
    box.stackable.forEach((stackableBox) => {
        var subHeight = highestStackH(stackableBox);
        if (subHeight > highestSubHeight) {
            highestSubHeight = subHeight;
        }
    });
    
    box.stackHeight = highestSubHeight + box.h;
    return box.stackHeight;
}

function highestStack(boxes) {
    generateStackableMap(boxes);
    var highest = 0;
    boxes.forEach((box) => {
        var height = highestStackH(box);
        if (height > highest) {
            highest = height;
        }
    });
    return highest;
}

var boxes = [];
[[1, 2, 3], [2, 3, 4], [1, 1, 1], [10, 10, 20], [7,5,6], [5, 4, 3]].forEach((preBox) => {
    var box = {w: preBox[0], h: preBox[1], d: preBox[2]};
    boxes.push(box);
});

console.log(highestStack(boxes));