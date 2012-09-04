/*global collections, $, _ */
var pathfinder = pathfinder || {};

(function () {
    'use strict';

    /**
     * Given a graph (2D array of int) with S and E as start and end points. This algorithm
     * will find a min-cost way to get there. The values of each space on the grid are the
     * weights. This algorithm only allows for up/down/left/right traversal.
     * //TODO: allow for "Node"/Object based system to traverse (not just a 2D array)
     * //TODO: allow for Matrix based graphs with edges specified as an array indices.
     *
     * @throw EndNodeUnreachableException if all paths from S have been explored and E is not found
     * @param graph (2D array of int) with start ("S") and end ("E") specified as strings. "X" is a wall.
     * @return {path:[{x,y},{x,y}...],normals:[{x,y},{x,y}...],cost}
     */
    function aStar(graph) {
        //nodes
        var evaluated = {},
            tentative = new collections.PriorityQueue(),
            tentativeHash = {},
            current = null,
            currentKey = graph.start.y + ":" + graph.start.x,
            //inner loop variables
            i = 0,
            distance = 0,
            tentativeGraphScore = 0,
            neighbor,
            neighborKey = "";

        function reconstructPath(path) {
            var current = path[path.length - 1];
            if (typeof current === "object" && current !== null) {
                path.push(current.cameFrom);
                return reconstructPath(path);
            } else {
                return path;
            }
        }

        function computeBranches(position) {
            var branches = [];
            function isWall(x, y) {
                if (graph.map[y][x] === "X") {
                    return true;
                }
                return false;
            }
            if (position.x - 1 >= 0
                    && !isWall(position.x - 1, position.y)) {
                branches.push({x: position.x - 1, y: position.y});
            }
            if (position.y - 1 >= 0
                    && !isWall(position.x, position.y - 1)) {
                branches.push({x: position.x, y: position.y - 1});
            }
            if (position.x + 1 < graph.map[position.y].length
                    && !isWall(position.x + 1, position.y)) {
                branches.push({x: position.x + 1, y: position.y});
            }
            if (position.y + 1 < graph.map.length
                    && !isWall(position.x, position.y + 1)) {
                branches.push({x: position.x, y: position.y + 1});
            }
            return branches;
        }

        function nodeDistance(x, y) {
            if (graph.map[y][x] === "E" ||
                graph.map[y][x] === "S") {
                return 0;
            } else if (graph.map[y][x] === "X") {
                return 9999999;
            }

            return graph.map[y][x];
        }

        function makeNode(position, graphScore, cameFrom) {
            var value = nodeDistance(position.x, position.y);
            return new collections.Node(graphScore, {
                position: position,
                branches: computeBranches(position),
                graphScore: graphScore + value,
                weight: value,
                cameFrom: cameFrom
            });
        }

        //add start node to tentative nodes
        tentativeHash[currentKey] = makeNode(graph.start, 0, null);
        tentative.offer(tentativeHash[currentKey]);

        while (tentative.size() > 0) {
            current = tentative.poll();
            currentKey = current.position.y + ":" + current.position.x;
            if (graph.map[current.position.y][current.position.x] === "E") {
                return reconstructPath([current]);
            }
            delete tentativeHash[currentKey];
            evaluated[currentKey] = current;

            for (i; i < current.branches.length; i++) {
                neighbor = current.branches[i];
                tentativeGraphScore = 0;
                distance = 0;
                neighborKey = neighbor.y + ":" + neighbor.x;

                //if key exists is undefined in the closed set then it hasn't been added
                if (typeof evaluated[neighborKey] === "undefined") {
                    distance = nodeDistance(neighbor.x, neighbor.y);
                    tentativeGraphScore = current.graphScore + distance;
                    //if not added to the tentative set yet add, if it is, compare old graphScore and new one
                    if (typeof tentativeHash[neighborKey] === "undefined"
                            || tentativeGraphScore < tentativeHash[neighborKey].graphScore) {
                        if (typeof tentativeHash[neighborKey] === "undefined") {
                            tentativeHash[neighborKey] = makeNode(neighbor,
                                tentativeGraphScore, current);
                            tentative.offer(tentativeHash[neighborKey]);
                        } else {
                            tentativeHash[neighborKey].graphScore = tentativeGraphScore;
                            tentativeHash[neighborKey].cameFrom = current;
                            tentativeHash[neighborKey].graphScore = tentativeGraphScore;
                            //no other heuristic for now... graphScore is the finalScore!
                            tentative.sift(tentativeHash[neighborKey]); //fix positioning in priority queue
                        }
                    }
                }
            }

            i = 0;
        }

        throw "EndNodeUnreachableException";
    }

    //expose
    pathfinder.aStar = aStar;
}());