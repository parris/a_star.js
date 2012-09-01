/*global describe, expect, it, beforeEach, $, _, pathfinder */
describe("Generated Map", function () {
    'use strict';
    var map;

    beforeEach(function () {
        map = pathfinder.Map({width: 10, height: 10});
    });


    it("has a map which is a two-d array foo", function () {
        expect(typeof map.get()).toEqual("object");
        expect(typeof map.get()[0]).toEqual("object");
        expect(map.get().length).toEqual(10);
        expect(typeof map.get()[0][0] === "number" || typeof map.get()[0][0] === "string").toEqual(true);
    });

    it("has a S for a star and a E for and end", function () {
        var mapString = _(map.get()).map(function (e) {return e.join(""); }).join("");
        expect(mapString.indexOf("S")).toBeGreaterThan(-1);
        expect(mapString.indexOf("E")).toBeGreaterThan(-1);
    });

    it("can draw the map", function () {
        map.draw("#astar");
        expect($("#astar table").length).toBeGreaterThan(0);
    });
});

describe("Set Map", function () {
    'use strict';
    var map,
        //fixtures
        testMap1 = [[0, 1, 2, 3, 4, 5, "E"], [0, 1, "S", 3, 4, 5, 6]],
        start1 = {x: 2, y: 1},
        end1 = {x: 6, y: 0};

    beforeEach(function () {
        map = pathfinder.Map({map: testMap1});
    });

    it("should set up the map properly", function () {
        expect(map.get()).toEqual(testMap1);
        expect(map.start).toEqual(start1);
        expect(map.end).toEqual(end1);
    });
});