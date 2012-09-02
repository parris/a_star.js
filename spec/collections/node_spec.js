/*global describe, expect, it, xit, beforeEach, $, _, collections */
describe("Node", function () {
    'use strict';

    describe("Initialization", function () {

        it("Initializes minimally", function () {
            var node = new collections.Node(5);
            expect(node.value).toEqual(5);
        });

        it("Initializes with extra members attached", function () {
            var node = new collections.Node(5, {
                "start": 11,
                "end": {
                    x: 10,
                    y: 2
                }
            });

            expect(node.value).toEqual(5);
            expect(node.start).toEqual(11);
            expect(node.end.x).toEqual(10);
            expect(node.end.y).toEqual(2);
        });
    });

    describe("Typical Setup", function () {
        var node,
            node2;

        beforeEach(function () {
            node = new collections.Node(5, {
                position: {
                    x: 10,
                    y: 1
                }
            });
            node2 = new collections.Node(10);
        });

        it("Can compare to another node", function () {
            var compared = node.compareTo(node2);
            expect(compared).toEqual(-1);

            node2 = new collections.Node(3);
            compared = node.compareTo(node2);
            expect(compared).toEqual(1);

            node2 = new collections.Node(5);
            compared = node.compareTo(node2);
            expect(compared).toEqual(0);
        });
    });
});