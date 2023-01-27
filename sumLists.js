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

function sumLists(n1, n2) {
    var answerRoot;
    var n3;
    var sum = 0;
    while (n1 != null || n2 != null) {
        if (n1 != null) {
            sum += n1.val;
            n1 = n1.next;
        }
        if (n2 != null) {
            sum += n2.val;
            n2 = n2.next;
        }
        var digit = sum % 10;
        sum = Math.floor(sum / 10);
        if (!answerRoot) {
            answerRoot = new Node(digit);
            n3 = answerRoot;
        } else {
            n3.next = new Node(digit);
            n3 = n3.next;
        }
    }
    if (sum > 0) {
        n3.next = new Node(sum);
    }
    return answerRoot;
}

var linkedList = new LinkedList();
[1, 2, 3].forEach((val) => {
    linkedList.add(val);
});

var linkedList2 = new LinkedList();
[9, 8].forEach((val) => {
    linkedList2.add(val);
});

var sum = sumLists(linkedList.head, linkedList2.head);

printLinkedList(sum);