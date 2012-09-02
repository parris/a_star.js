var collections = collections || {};
(function () {
    'use strict';

    /**
     * Creates a new priority queue object. If your data is just basic types: Numbers, Strings the
     * default javascript comparisons will be made. If your data is an object then those objects must
     * have a compareTo method. If no compareTo method exist then and MissingComparatorException will
     * be thrown. This priority queue is based on min-heap using an array. Lower values will always be given first.
     * Everything in your priority queue must be of the same type otherwise it is not possible to compare.
     *
     * @param data (optional) Will accept and array as the initial seed for the priority queue
     * @constructor
     * @throw MissingComparatorException
     */
    function PriorityQueue(data) {
        var that = this,
        //for iterating initial seed data
            i = 0,
        //root = 0, root's left child = 1, root's right child = 2
        //element i's left child = 2*i, element i's right child = 2*i+1
            heap = [],
        //the data type of all items in this priority queue
            generic;

        /**
         * If the type is an array, it will return array; otherwise, it
         * will return the type as normal.
         * @param item to type check.
         * @return type
         */
        function pq_find_generic(item) {
            var result,
                item_type = typeof item;
            //i don't really want to consider and array as an object
            if (item_type === "object"
                    && item !== null
                    && typeof item.length !== "undefined") {
                result = "array";
            } else {
                result = item_type;
            }
            return result;
        }

        /**
         * Swaps 2 values in heap by index
         * @param i first index to swap
         * @param j second index to swap
         */
        function pq_swap(i, j) {
            var temp = heap[j];
            heap[j] = heap[i];
            heap[i] = temp;
            return that;
        }

        /**
         * Getter for size_of_data
         * @return {Number}
         */
        function pq_size() {
            return heap.length;
        }

        /**
         * Returns and removes the minimum value off the priority queue, and finds the next minimum
         * @return {*} min value
         */
        function pq_poll() {
            var result;
            if (heap.length === 0){
                throw "PriorityQueueEmptyException";
            }

            pq_swap(0, heap.length - 1);
            result = heap.pop(); //remove the last element and save it

            (function min_heapify(i) {
                var left = 2 * i + 1,
                    right = 2 * i + 2,
                    smallest = i;
                if (left < heap.length &&
                        ((generic !== "object" && heap[left] < heap[smallest])
                            || (generic === "object" && heap[left].compareTo(heap[smallest]) === -1))) {
                    smallest = left;
                }
                if (right < heap.length &&
                        ((generic !== "object" && heap[right] < heap[smallest])
                            || (generic === "object" && heap[right].compareTo(heap[smallest]) === -1))) {
                    smallest = right;
                }
                if (smallest !== i) {
                    pq_swap(i, smallest);
                    min_heapify(smallest);
                }
            }(0));

            return result;
        }

        /**
         * Adds an item to the PriorityQueue
         * @throw InvalidDataException when data type doesn't match or undefined, null or function
         * @param Item of consistent type to add. If object it must contain a compareTo method returning 1, 0, -1
         * @return {PriorityQueue} This.
         */
        function pq_offer(item) {
            var next_index,
                item_type = pq_find_generic(item);
            function bubble(i) {
                var parent_index;
                if (i === 0) {
                    return true;
                }
                parent_index = Math.floor((i + 1) / 2) - 1;
                //if object, do a compareTo, otherwise try primitive comparison
                //only if the value of i is greater than j swap
                //don't swap if equal or less, which includes comparing itself (done)
                if ((generic === "object" && heap[parent_index].compareTo(heap[i]) > 0)
                        || (generic !== "object" && heap[parent_index] > heap[i])) {
                    pq_swap(i, parent_index);
                    //after swap you should bubble up and check the next level
                    bubble(parent_index);
                }
            }

            //inserted item can't be:
            //undefined, null, a function or an object (not array) and doesn't have a compareToMethod
            if (item_type === "undefined"
                    || item === null
                    || item_type === "function"
                    || (item_type === "object"
                        && typeof item.compareTo === "undefined")) {
                throw "InvalidDataException";
            }
            if (heap.length === 0) {
                generic = pq_find_generic(item);
                heap.push(item);
            } else {
                if (generic !== pq_find_generic(item)) {
                    throw "InvalidDataException";
                }
                next_index = heap.length;
                heap[next_index] = item;
                bubble(next_index);
            }

            return that;
        }

        /**
         * Returns the minimum value without removing it
         * @return {*} minimum value
         */
        function pq_peek() {
            return heap[0];
        }

        //construct
        if (typeof data !== "undefined") {
            for (i; i < data.length; i++) {
                pq_offer(data[i]);
            }
        }

        //expose
        this.size = pq_size;
        this.offer = pq_offer;
        this.peek = pq_peek;
        this.poll = pq_poll;

        return that;
    }

    //expose
    collections.PriorityQueue = PriorityQueue;
}());