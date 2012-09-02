/*global describe, expect, it, xit, beforeEach, $, _, pathfinder */
describe("AStar", function () {
    'use strict';
    var map,
        //fixtures
        testMap1 = [[1, 2, 3, 4, 5, "S"], [1, 3, 10, 20, 2, 50], [20, 20, 30, 40, 1, 10], [20, 30, 40, 50, "E", 10]];

    beforeEach(function () {
        map = pathfinder.Map({width: 10, height: 10});
    });

    xit("Finds a path from S to E", function () {
        expect(pathfinder.aStar(map)).toEqual({
            path: [
                {"x": 4, "y": 0},
                {"x": 4, "y": 1},
                {"x": 4, "y": 2},
                {"x": 4, "y": 3}
            ],
            normals: [
                {"x": -1, "y": 0},
                {"x": 0, "y": -1},
                {"x": 0, "y": -1},
                {"x": 0, "y": -1}
            ],
            cost: 8
        });
    });
});