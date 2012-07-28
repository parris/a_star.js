describe("AStar", function(){
   var aStar;

   beforeEach(function(){
      aStar = new AStar(10, 10);
   });

   it("has a map which is a two-d array foo", function(){
       expect(typeof aStar.map()).toEqual("object");
       expect(typeof aStar.map()[0]).toEqual("object");
       expect(aStar.map().length).toEqual(10);
       expect(typeof aStar.map()[0][0] == "number" || typeof aStar.map()[0][0] == "string").toEqual(true);
   });

   it("has a S for a star and a E for and end", function(){
       var mapString = _(aStar.map()).map(function(e) {return e.join("")}).join("");
       expect(mapString.indexOf("S")).toBeGreaterThan(-1);
       expect(mapString.indexOf("E")).toBeGreaterThan(-1);
   });

   it("can draw the map", function(){
       aStar.draw("#astar");
       expect($("#astar table").length).toBeGreaterThan(0);
   });
});