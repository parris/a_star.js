/*global describe, expect, it, beforeEach, $, _, pathfinder, collections */
describe("Priority Queue", function () {
    'use strict';
    var pq,
        //fixtures
        validObject1 = {
            map: "pizza",
            compareTo: function (j) {
                if (this.map > j.map) {
                    return 1;
                } else if (this.map < j.map) {
                    return -1;
                }
                return 0;
            }
        },
        EpicClass = function (value) {
            this.value = value;
            this.compareTo = function (j) {
                if (this.value > j.value) {
                    return 1;
                } else if (this.value < j.value){
                    return -1;
                }
                return 0;
            };
        };

    beforeEach(function () {
        pq = new collections.PriorityQueue(undefined);
    });

    it("Initializes without array", function () {
        expect(pq.size()).toEqual(0);
    });

    it("Increments size as items are added", function () {
        expect(pq.size()).toEqual(0);
        pq.offer(1);
        expect(pq.size()).toEqual(1);
        pq.offer(2);
        expect(pq.size()).toEqual(2);
    });

    it("Can grab the smallest item", function () {
        pq.offer(1);
        expect(pq.poll()).toEqual(1);
    });

    it("Accepts objects with compareTo methods and primitives", function () {
        expect(function () {pq.offer(validObject1); }).not.toThrow("InvalidDataException");
        pq.poll(); // can't change type, empty first
        expect(function () {pq.offer(1); }).not.toThrow("InvalidDataException");
    });

    it("Rejects bad insertions", function () {
        expect(function () { pq.offer(function () {}); }).toThrow("InvalidDataException");
        expect(function () { pq.offer(undefined); }).toThrow("InvalidDataException");
        expect(function () { pq.offer(null); }).toThrow("InvalidDataException");
        expect(function () { pq.offer({map: "pizza"}); }).toThrow("InvalidDataException");
    });

    it("Rejects insertions between different generics", function () {
        pq.offer(10);
        expect(function () { pq.offer(new EpicClass(5)); }).toThrow("InvalidDataException");
        pq.poll();

        expect(function () {pq.offer(new EpicClass(5)); }).not.toThrow("InvalidDataException");
        expect(function () {pq.offer(10); }).toThrow("InvalidDataException");
    });

    it("Puts the min value at the top of the heap", function () {
        pq.offer(10).offer(5).offer(3).offer(6);
        expect(pq.peek()).toEqual(3);
    });

    it("Polls values in the correct order", function () {
        pq.offer(10).offer(5).offer(3).offer(6);
        expect(pq.poll()).toEqual(3);
        expect(pq.poll()).toEqual(5);
        expect(pq.poll()).toEqual(6);
        expect(pq.poll()).toEqual(10);
        expect(function () {pq.poll(); }).toThrow("PriorityQueueEmptyException");

        //larger example:
        //1, 6, 10, 11, 20, 90, 100, 9999
        pq.offer(20).offer(90).offer(10).offer(100).offer(6).offer(1).offer(11).offer(9999);
        expect(pq.poll()).toEqual(1);
        expect(pq.poll()).toEqual(6);
        expect(pq.poll()).toEqual(10);
        expect(pq.poll()).toEqual(11);
        expect(pq.poll()).toEqual(20);
        expect(pq.poll()).toEqual(90);
        expect(pq.poll()).toEqual(100);
        expect(pq.poll()).toEqual(9999);
    });

    it("Polls objects with compareTo methods", function () {
        pq.offer(new EpicClass(10))
            .offer(new EpicClass(5))
            .offer(new EpicClass(3))
            .offer(new EpicClass(6));
        expect(pq.poll().value).toEqual(3);
        expect(pq.poll().value).toEqual(5);
        expect(pq.poll().value).toEqual(6);
        expect(pq.poll().value).toEqual(10);

        //larger example:
        //1, 6, 10, 11, 20, 90, 100, 9999
        pq.offer(new EpicClass(20))
            .offer(new EpicClass(90))
            .offer(new EpicClass(10))
            .offer(new EpicClass(100))
            .offer(new EpicClass(6))
            .offer(new EpicClass(1))
            .offer(new EpicClass(11))
            .offer(new EpicClass(9999));
        expect(pq.poll().value).toEqual(1);
        expect(pq.poll().value).toEqual(6);
        expect(pq.poll().value).toEqual(10);
        expect(pq.poll().value).toEqual(11);
        expect(pq.poll().value).toEqual(20);
        expect(pq.poll().value).toEqual(90);
        expect(pq.poll().value).toEqual(100);
        expect(pq.poll().value).toEqual(9999);
    });
});

describe("Priority Queue with array", function () {
    'use strict';
    var pq;

    beforeEach(function () {
        pq = new collections.PriorityQueue([1, 2, 3, 4, 5, 6]);
    });

    it('Initializes with array', function () {
        expect(pq.size()).toEqual(6);
    });
});