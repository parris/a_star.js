function AStar(width, height) {
    this._map = [];
    for(var i=0; i<width; i++) {
      this._map[i] = [];
      for(var j=0; j<height; j++){
          this._map[i][j] = Math.floor(100*Math.random());
      }
    }

    var sX = Math.floor(width*Math.random());
    var sY = Math.floor(height*Math.random());
    var eX = Math.floor(width*Math.random());
    var eY = Math.floor(height*Math.random());

    this._map[sX][sY] = "S";
    this._map[eX][eY] = "E";
}

AStar.prototype.map = function(){
    return this._map;
};

AStar.prototype.draw = function(selector){
    var mapHtml = $("<table></table>");
    //$(selector).html(html);
    for(var j=0;j<this._map[0].length;j++){
        var row = $("<tr></tr>");
        for(var i=0;i<this._map.length;i++){
            row.append($("<td>"+this._map[i][j]+"</td>"))
        }
        mapHtml.append(row);
    }
    $(selector).append(mapHtml);
};