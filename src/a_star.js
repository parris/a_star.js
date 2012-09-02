/*global collections, $, _ */
var pathfinder = pathfinder || {};

(function () {
    'use strict';

    function aStar(map) {
        //nodes
        var evaluated = [],
            tentative = new collections.PriorityQueue([new collections.Node(map.start)]),
            navigated = [],
            score = 0,
            current = null;

        while (tentative.length > 0) {
            current = tentative.poll();
            if (current.value) {

            }
        }


    }

    //expose
    pathfinder.aStar = aStar;
}());