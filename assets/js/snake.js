(function(){
  var SnakeGame = window.SnakeGame = window.SnakeGame || {};

  var Snake = SnakeGame.Snake = function(segments){
      this.dir = "N";
      this.segments = segments;
  };


  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  Snake.prototype.isSnakePresent = function(pos){
    var present = false
    this.segments.forEach(function(segment){
      if (segment[0] === pos[0] && segment[1] === pos[1]) {
        present = true;
      }
    });
    return present;
  };

  Snake.prototype.head = function(){
    return this.segments[0];
  };

})();
