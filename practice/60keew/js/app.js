var app = new Vue({
  el: "#app",
  data: {
    gameOver: false,
    playerOne: false,
    playerTwo: false,
    playerTurn: 1,
    grid: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]
  },

  methods: {
    selectCell: function(row, col) {
      //get the row to place the puck at
      var moveRow = this.lowestMove(col);

      if (moveRow >= 0) {
        //copy grid to a temporary var
        var tempGrid = this.grid.slice(0);

        //modify the cloned version
        tempGrid[moveRow][col] = this.playerTurn;

        //replace
        this.grid = tempGrid;

        //swap player turn
        this.playerTurn = this.playerTurn == 1 ? 2 : 1;

        //check for win
        this.checkWin();
      }
    },
    checkWin: function() {
      //loop through all columns to check
      //if win found, set over to true
      //i = row j = col
      //console.log(this.grid[i][j]); length
      for (var row = 0; row < this.grid.length; row++) {
        for (var col = 0; col < this.grid[row].length; col++) {
          if (row - 3 >= 0) {
            if (
              this.grid[row - 3][col] == this.grid[row - 2][col] &&
              this.grid[row - 1][col] == this.grid[row][col] &&
              this.grid[row][col] == this.grid[row - 3][col] &&
              (this.grid[row][col] == 1 || this.grid[row][col] == 2)
            ) {
              this.gameOver = true;
              if (this.playerTurn == 1) {
                this.playerTwo = true;
              } else {
                this.playerOne = true;
              }
              break;
            }
          }
          if (col - 3 >= 0) {
            if (
              this.grid[row][col - 3] == this.grid[row][col - 2] &&
              this.grid[row][col - 1] == this.grid[row][col] &&
              this.grid[row][col] == this.grid[row][col - 3] &&
              (this.grid[row][col] == 1 || this.grid[row][col] == 2)
            ) {
              this.gameOver = true;
              if (this.playerTurn == 1) {
                this.playerTwo = true;
              } else {
                this.playerOne = true;
              }
              this.winningplayer = this.playerturn;
              break;
            }
          }
          if (row - 3 >= 0 && col - 3 >= 0) {
            if (
              this.grid[row - 3][col - 3] == this.grid[row - 2][col - 2] &&
              this.grid[row - 1][col - 1] == this.grid[row][col] &&
              this.grid[row][col] == this.grid[row - 3][col - 3] &&
              (this.grid[row][col] == 1 || this.grid[row][col] == 2)
            ) {
              this.gameOver = true;
              if (this.playerTurn == 1) {
                this.playerTwo = true;
              } else {
                this.playerOne = true;
              }
              this.winningplayer = this.playerturn;
              break;
            }
          }
          if (row - 3 >= 0 && col + 3 <= this.grid[row].length) {
            if (
              this.grid[row - 3][col + 3] == this.grid[row - 2][col + 2] &&
              this.grid[row - 1][col + 1] == this.grid[row][col] &&
              this.grid[row][col] == this.grid[row - 3][col + 3] &&
              (this.grid[row][col] == 1 || this.grid[row][col] == 2)
            ) {
              this.gameOver = true;
              if (this.playerTurn == 1) {
                this.playerTwo = true;
              } else {
                this.playerOne = true;
              }
              this.winningplayer = this.playerturn;
              break;
            }
          }
        }
      }
    },
    lowestMove: function(col) {
      //start at the bottom of a col, loop upwards
      for (var row = 5; row >= 0; row--) {
        //check to see if current row is free
        if (this.grid[row][col] == 0) {
          //if it is free, return the row index
          return row;
        }
      }
    }
  }
});
