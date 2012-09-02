/*global collections, $, _ */
var pathfinder = pathfinder || {};

(function () {
    'use strict';

    function aStar(map) {
        //nodes
        var evaluated = [],
            tentative = new collections.PriorityQueue([map.start]),
            navigated = [],
            score = 0,
            current = null;

        while (tentative.length > 0) {
            current = tentative.poll();
        }


    }

    //expose
    pathfinder.aStar = aStar;
}());