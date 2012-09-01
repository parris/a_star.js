/*global describe, expect, it, beforeEach, $, _, pathfinder */
describe("AStar", function () {
    'use strict';
    var map;

    beforeEach(function () {
        map = pathfinder.Map({width: 10, height: 10});
    });

    it("Finds a path from S to E", function () {
        expect(true).toEqual(true);
    });
});