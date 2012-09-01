/*global $, _ */
var pathfinder = pathfinder || {};
(function () {
    'use strict';

    /**
     * Finds and returns the end points on the map
     * @param map_param A 2D array of numbers with a "S" and "E" denoting start and end positions
     * @return {start: {x,y}, end:{x,y}};
     */
    function mapFindEndPoints(map_param) {
        var width = map_param[0].length,
            mapFlat = _.flatten(map_param),
            startPosition = mapFlat.indexOf("S"),
            endPosition = mapFlat.indexOf("E"),
            start = {
                x: Math.floor(startPosition % width),
                y: Math.floor(startPosition / width)
            },
            end = {
                x: Math.floor(endPosition % width),
                y: Math.floor(endPosition / width)
            };
        return {start: start, end: end};
    }

    //expose
    pathfinder.findEndPoints = mapFindEndPoints;

    /**
     * Creates a Map object
     * @param args.map (optional) If set it will take the array of arrays (2D) specified and use it as our map
     * @param args.width (optional) Requires height to also be set, the width of the 2D array to generate
     * @param args.height (optional) Requires width to also be set, the height of the 2D array to generate
     * @throw InvalidInputException
     */
    function Map(args) {
        var map = [],
            start = {x: 0, y: 0},
            end = {x: 0, y: 0};

        /**
         * Gets the Map array
         * @return {Array}
         */
        function mapGet() {
            return map;
        }

        /**
         * Sets the Map to a new 2D array
         * @param map
         * @return {Array}
         */
        function mapSet(map_param) {
            var position = pathfinder.findEndPoints(map_param);
            map = map_param;
            start = position.start;
            end = position.end;
            return { map: map, start: start, end: end };
        }

        /**
         * Generates a 2D array at width/height, with S and E as start and end points
         * //TODO: there is a chance that S and E will overlap, fix that
         * @param width
         * @param height
         */
        function mapGenerate(width, height) {
            var i = 0,
                j = 0,
                sX = Math.floor(width * Math.random()),
                sY = Math.floor(height * Math.random()),
                eX = Math.floor(width * Math.random()),
                eY = Math.floor(height * Math.random());
            map = [];

            for (i; i < width; i++) {
                map[i] = [];
                for (j; j < height; j++){
                    map[i][j] = Math.floor(100 * Math.random());
                }
                j = 0;
            }

            map[sX][sY] = "S";
            map[eX][eY] = "E";
            start = { x: sX, y: sY };
            end = { x: eX, y: eY };

            return { map: map, start: start, end: end };
        }

        /**
         * Renders the map as a table of numbers with start and end points represented as S and E
         * @param selector (required) A DOM element where this should be drawn
         * @throw InvalidInputSelector When input is not an object or a string //TODO: jquery object or elment name
         * @return element (jquery obj)
         */
        function mapDraw(selector) {
            var mapHtml = $("<table></table>"),
                j = 0,
                i = 0,
                row = "",
                el = $(selector);

            if (typeof selector !== "object" && typeof selector !== "string") {
                throw "InvalidInputException";
            }

            for (j; j < map[0].length; j++) {
                row = $("<tr></tr>");
                for (i; i < map.length; i++) {
                    row.append($("<td>" + map[i][j] + "</td>"));
                }
                i = 0;
                mapHtml.append(row);
            }
            el.append(mapHtml);
            return el;
        }

        //construct
        if (typeof args !== "object") {
            throw "InvalidInputException";
        }

        if (typeof args.map !== "undefined") {
            mapSet(args.map);
        } else if (typeof args.width === "number" && typeof args.height === "number") {
            mapGenerate(args.width, args.height);
        } else {
            throw "InvalidInputException";
        }

        //expose
        return {
            map : map,
            start: start,
            end: end,
            set : mapSet,
            get : mapGet,
            draw : mapDraw
        };
    }

    //expose
    pathfinder.Map = Map;
}());