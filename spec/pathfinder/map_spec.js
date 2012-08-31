/*global describe, expect, it, beforeEach, $, _, pathfinder */
describe("Map", function () {
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