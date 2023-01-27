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

function getLoopSize(head) {
    var fast = head.next.next;
    var slow = head.next;
    while (fast != slow) {
        fast = fast.next.next;
        slow = slow.next;
    }
    var loopSize = 1;
    fast = fast.next
    while (fast != slow) {
        loopSize += 1;
        fast = fast.next;
    }

    return loopSize;
}

function loopDetection(head) {
    var loopSize = getLoopSize(head);
    var fast = head;
    var slow = head;
    for (loopSize; loopSize > 0; loopSize--) {
        fast = fast.next;
    }
    while (fast != slow) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
}

var linked = new LinkedList();
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((val) => {
    linked.add(val);
});

linked.tail.next = linked.head.next.next.next.next;

var loopNode = loopDetection(linked.head);
console.log(loopNode.val);