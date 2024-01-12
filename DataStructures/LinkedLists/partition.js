class Node {
    val; next;
    constructor(initVal) {
        this.val = initVal;
    }
}

class LinkedList {
    head; tail;
    constructor() {

    }
    
    add(value) {
        if (!this.head) {
            this.head = new Node(value);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(value);
            this.tail = this.tail.next; 
        }
    }
}

function printLinkedList(head) {
    while (head != null) {
        console.log(head.val);
        head = head.next;
    }
}

function partition(head, pivot) {
    var headL;
    var headG;
    var tailL;
    var tailG;
    var ptr = head;
    while (ptr != null) {
        var node = ptr;
        ptr = ptr.next;
        if (node.val < pivot) {
            if (!headL) {
                headL = node;
                tailL = headL;
            } else {
                tailL.next = node;
                tailL = tailL.next;
            }
        } else {
            if (!headG) {
                headG = node;
                headG.next = null;
            } else {
                node.next = headG;
                headG = node;
            }
        }
    }
    if (tailL) {
        tailL.next = headG;
        return headL;
    }

    return headG;
}

var linkedList = new LinkedList();
[3, 5, 8, 5, 10, 2, 1].forEach((val) => {
    linkedList.add(val);
});
printLinkedList(linkedList.head);


var newList = partition(linkedList.head, 5);

while (newList != null) {
    console.log(newList.val);
    newList = newList.next;
}

