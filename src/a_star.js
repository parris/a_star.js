/*global $, _ */
var pathfinder = pathfinder || {};

(function () {
    'use strict';

    function aStar(map) {
        //nodes
        var evaluated = [],
            tentative = [map.start], //change to priorityqueue
            navigated = [],
            score = 0,
            current = null;

        while (tentative.length > 0) {
            current = tentative.pop(); //pull off priorityqueue
        }


    }

    //expose
    pathfinder.aStar = aStar;
}());