(function(){
    var SnakeGame = window.SnakeGame = window.SnakeGame || {};

    var View = SnakeGame.View = function($el, difficulty){
      this.board = new SnakeGame.Board();
      this.$el = $el;
      this.difficulty = difficulty;
      this.bindListener();
      this.setUpView();
      this.run();
      this.score = 0;
    };

    View.DIFFICULTY_LEVELS = {
      "Easy" : 300,
      "Medium" : 200,
      "Hard" : 100
    };

    View.prototype.bindListener = function () {
      var that = this;
      $(document).keydown(function(e){
        if (e.keyCode === 37 && that.board.snake.dir !== "E"){
          that.board.snake.dir = "W";
        } else if (e.keyCode === 38 && that.board.snake.dir !== "S"){
          that.board.snake.dir = "N";
        } else if (e.keyCode === 39 && that.board.snake.dir !== "W"){
          that.board.snake.dir = "E";
        } else if (e.keyCode === 40 && that.board.snake.dir !== "N"){
          that.board.snake.dir = "S";
        }
      });
    };

    View.prototype.checkForSnakes = function(){
      $(".box").removeClass("occupied");
      this.board.snake.segments.forEach(function(segment){
        var row = segment[0];
        var col = segment[1];
        $(".box.col-"+ col + ".row-" + row).addClass("occupied");
      });
    };

    View.prototype.addApple = function(){
      $(".box").removeClass("apple");
      var row = this.board.applePos[0];
      var col = this.board.applePos[1];
      $(".box.col-"+ col + ".row-" + row).addClass("apple");
    };

    View.prototype.eatApple = function(){
      if (this.board.applePos[0] === this.board.snake.head()[0] &&
          this.board.applePos[1] === this.board.snake.head()[1]
        ) {
          this.board.growTurns += 2;
          this.board.placeApple();
          this.score += 10;
      }
    };

    View.prototype.step = function(){
      this.board.move();
      this.checkForSnakes();
      this.addApple();
      this.eatApple();
      $(".score-container").text(this.score);
    };

    View.prototype.run = function(){
      var that = this;
      $(".score-panel").css("display", "block");
      var intervalId = setInterval(function(){
        if(!that.board.isOver()){
          that.step();
        } else {
          window.clearInterval(intervalId);
          $(".score-panel").css("display", "none");
          $(".end-screen").css("display", "block");
          var currentHighScore = $(".high-score").text();
          if (that.score > parseInt(currentHighScore)) {
            $(".high-score").text(that.score);
          }
          $(".row").remove();
        }
      },
      View.DIFFICULTY_LEVELS[this.difficulty]);
    }

    View.prototype.setUpView = function () {
      var $board = this.$el;
      for (var i = 0; i < this.board.grid.length; i++) {
        var $row = $("<div>").addClass("row");
        $board.append($row);
        for (var j = 0; j < this.board.grid.length; j++) {
          var $box = $("<div>");
          $box.addClass("box").addClass("col-" + j).addClass("row-" + i);
          $row.append($box);
        }
      }
    };
})();
