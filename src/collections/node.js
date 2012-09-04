var collections = collections || {};
/*global _ */
(function () {
    'use strict';

    /**
     * Base class to be extended. Includes a comparator.
     * @param value is the comparable value.
     * @param args {*} Any other data you would like to include with this node.
     *      Do not send an object with member named value.
     * @constructor
     */
    function Node(value, args) {
        var that = this;
        this.value = value;
        //append args to this object
        _(this).extend(args);

        /**
         * Compares 2 Nodes.
         * @param {Node} Some other node to compareTo
         * @return {Number} If this node is larger then 1, if the other node is larger then -1, otherwise 0
         */
        function compareTo(other_node) {
            if (that.value > other_node.value) {
                return 1;
            } else if (that.value < other_node.value) {
                return -1;
            }

            return 0;
        }

        this.compareTo = compareTo;
    }

    //expose
    collections.Node = Node;
}());