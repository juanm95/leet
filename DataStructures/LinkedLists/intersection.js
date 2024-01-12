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

function intersectingNode(n1, n2, len1, len2) {
    if (len1 > len2) {
        return intersect(n1, n2, len1 - len2);
    } else {
        return intersect(n2, n1, len2 - len1)
    }
}

function intersect(fast, slow, diff) {
    for (diff; diff > 0; diff--) {
        fast = fast.next;
    }
    while (fast != slow && fast != null && slow != null) {
        fast = fast.next;
        slow = slow.next;
    }
    return fast == slow ? fast : null;
}

function getLength (node) {
    var length = 0;
    while (node != null) {
        node = node.next;
        length++;
    }
    return length;
}

function mainIntersect(n1, n2) {
    var len1 = getLength(n1);
    var len2 = getLength(n2);
    if (len1 == 0 || len2 == 0) {
        return null;
    }
    
    return intersectingNode(n1, n2, len1, len2);
}

var n1 = new Node(1);
n1.next = new Node(2);
n1.next.next = new Node(3);
n1.next.next.next = new Node(4);
n1.next.next.next.next = new Node(5);
var n2 = new Node(1);
n2.next = n1.next.next.next;

var n3 = mainIntersect(n1, n2);

console.log(n3.val);