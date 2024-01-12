# Tricks

* String Replacement "AABAA"
    * Frequency Map + Sliding window. As you read new characters, add them to the frequency map, and if you have to, kick out an old character by increasing start and reducing it in the frequency map.

* Generating Parentheses
    * Use a Stack + Backtracking. The stack stores the parens thus far so you don't have store a bunch of strings for each level. The backtracking function stores your open and closed parens. Once you've reached the end, you just join the stack of parens and add that to output.

* Daily Temperatures
    * The stack was going to be "Monotonic Decreasing" order. This meant I knew that if I popped from the stack, everything left was warmer.

* Validate BST
    * Use an inorder traversal, Left -> Node -> Right and then just check if the order is in order.

* Construct a Binary Tree from Inorder and Preorder
    * Use the Inorder to determine the size of the left and right children of the known root. Then recurse on that by passing in the roots from preorder and the bounds of the children in the inorder.

* Max sum path in a binary tree
    * Store the overall max and return the max path starting at this node. It's important though that the values used for overall max can include both children of a node, but the max path start at that node can only include one child.

* Merge K Sorted Lists
    * I tried to use a min heap to go quickly find the smallest item in the list. That works in O(N log K), but the more straight forward solution is to reduce the problem size iteratively. Merging 2 lists takes linear time O(num nodes). With K lists I can combine the individual lists into half the number of lists until I have just one list. Each time I'm halving, so it's log K times, total O(N log K).