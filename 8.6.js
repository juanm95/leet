function moveDisks(count, source, buffer, dest) {
    if (count == 1) dest.push(source.pop());
    if (count == 2) {
        buffer.push(source.pop());
        dest.push(source.pop());
        dest.push(buffer.pop());
    }
    if (count > 2) {
        moveDisks(count - 1, source, dest, buffer);
        moveDisks(1, source, buffer, dest);
        moveDisks(count - 1, buffer, source, dest);
    }
}

var source = [1, 2, 3, 4];
var buffer = [];
var dest = [];
moveDisks(4, source, buffer, dest);
[source, buffer, dest].forEach((array) => {console.log(array)});