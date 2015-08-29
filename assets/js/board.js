(function(){
  var SnakeGame = window.SnakeGame = window.SnakeGame || {};

  var Board = SnakeGame.Board = function(){
    this.grid = [];
    this.setUpGrid();
    this.snake = undefined;
    this.setUpSnake();
    this.applePos = undefined;
    this.placeApple();
    this.growTurns = 0;
  };

  Board.BOARD_SIZE = 15;
  Board.SNAKE_SIZE = 5;
  Board.SNAKE_START = [7, 7];
  Board.MOVE_DIFFS = {
    "N" : [-1, 0],
    "E" : [0, 1],
    "S" : [1, 0],
    "W" : [0, -1]
  };

  Board.prototype.setUpGrid = function () {
    for (var i = 0; i < Board.BOARD_SIZE; i++) {
      var row = [];
      for (var j = 0; j < Board.BOARD_SIZE; j++) {
        row.push([]);
      }
      this.grid.push(row);
    }
  };

  Board.prototype.onBoard = function(pos){
    return (pos[0]> 0 && pos[0] < Board.BOARD_SIZE) && (pos[1]> 0 && pos[1] < Board.BOARD_SIZE);
  };

  Board.prototype.setUpSnake = function() {
    var startingSegs = [Board.SNAKE_START];
    for (var i = 1; i < Board.SNAKE_SIZE; i ++){
      var nextSeg = [startingSegs[0][0], startingSegs[0][1] + 1];
      startingSegs.unshift(nextSeg);
    }
    this.snake = new SnakeGame.Snake(startingSegs);
  };

  Board.prototype.move = function(){
    if (this.growTurns === 0) {
      this.snake.segments.pop();
    } else {
      this.growTurns -= 1;
    }
    var first = this.snake.segments[0];
    var diff = Board.MOVE_DIFFS[this.snake.dir];
    var newX = first[0] + diff[0];
    var newY = first[1] + diff[1];

    if (newX < 0) {
      newX = (Board.BOARD_SIZE - 1);
    } else if (newX > (Board.BOARD_SIZE - 1)) {
      newX = 0;
    } else if (newY < 0) {
      newY = (Board.BOARD_SIZE - 1);
    } else if(newY > (Board.BOARD_SIZE - 1)) {
      newY = 0;
    }

    this.snake.segments.unshift([newX, newY]);
  };


  Board.prototype.isOver = function(){
    var that = this;
    var over = false;
    var snakeSegs = this.snake.segments;
    for (var i = 1; i < snakeSegs.length; i++) {
      if (that.snake.head()[0] === snakeSegs[i][0] && that.snake.head()[1] === snakeSegs[i][1]) {
        over = true;
      }
    }

    return over;

  };

  Board.prototype.placeApple = function(){
    var x = Math.floor(Math.random() * Board.BOARD_SIZE);
    var y = Math.floor(Math.random() * Board.BOARD_SIZE);

    while (this.snake.isSnakePresent([x,y])) {
      x = Math.floor(Math.random() * Board.BOARD_SIZE);
      y = Math.floor(Math.random() * Board.BOARD_SIZE);
    }
    this.applePos = [x,y];
  };

})();
