/*global describe, expect, it, xit, beforeEach, $, _, pathfinder */
describe("AStar", function () {
    'use strict';
    var map,
        //fixtures
        testMap1 = [[1, 2, 3, 4, 5, "S"], [1, 3, 10, 20, 2, 50], [20, 20, 30, 40, 1, 10], [20, 30, 40, 50, "E", 10]],
        testMap2 = [[1, "S"], ["E", 3]];

    beforeEach(function () {
        map = pathfinder.Map({map: testMap1});
    });

    it("Finds a path from S to E", function () {
        var path = pathfinder.aStar(map);
        expect(path.length).toEqual(6);
    });
});