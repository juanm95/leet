/**
inserts and returns true if item is not present
remove removes and returns true if item IS present
getRandom returns a random element
Each element must have the same probability. Uniform distribution

array
map each value maps to an index in the array
    key: values
    value: index in the array

getRandom
    get random int from 0 to array.length - 1

remove
    go to map, get the value and the index in the array
    in the array, we will swap the element at the index with the last element in the array
    and then we pop.
    find the previous last element in the map and update the pointer to its new position in the     array
 */
    var RandomizedSet = function() {
        this.map = new Map();
        this.array = [];
    };
    
    /** 
     * @param {number} val
     * @return {boolean}
     */
    RandomizedSet.prototype.insert = function(val) {
        if (this.map.has(val)) {
            return false;
        }
    
        this.array.push(val);
        this.map.set(val, this.array.length - 1);
        return true;
    };
    
    /**
    [2, 1]
    map:[(1,1), (2,0)]
    remove 0
    index: 0
    endVal: 2
    
     */
    
    /** 
     * @param {number} val
     * @return {boolean}
     */
    RandomizedSet.prototype.remove = function(val) {
        if (!this.map.has(val)) {
            return false;
        }
    
        let index = this.map.get(val);
        // swapping
        let endVal = this.array.at(-1);
        this.array[index] = endVal;
        this.map.set(endVal, index);
        this.array.pop();
        this.map.delete(val);
        return true;
    };
    
    /**
     * @return {number}
     */
    RandomizedSet.prototype.getRandom = function() {
        let randomInt = Math.floor(Math.random() * (this.array.length));
        return this.array[randomInt];
    };
    
    /** 
     * Your RandomizedSet object will be instantiated and called as such:
     * var obj = new RandomizedSet()
     * var param_1 = obj.insert(val)
     * var param_2 = obj.remove(val)
     * var param_3 = obj.getRandom()
     */