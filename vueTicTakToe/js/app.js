class Box {
  constructor() {
    this.value = null;
  }
}

class Game {
  constructor() {
    this.inProgress = true;
    this.winner = null; //will be either o or x
    this.currentTurn = Game.O; //o always goes first
    this.movesMade = 0;
    this.boxes = [
      new Box(),
      new Box(),
      new Box(),
      new Box(),
      new Box(),
      new Box(),
      new Box(),
      new Box(),
      new Box()
    ];
  }

  makeMove(i) {
    //if in progress run this
    if (this.inProgress && !this.boxes[i].value) {
      this.boxes[i].value = this.currentTurn;

      //add to the move counter
      this.movesMade++;

      //check for winner
      this.checkForWinner();

      //change player turn
      if (this.currentTurn === Game.O) {
        this.currentTurn = Game.X;
      } else if (this.currentTurn === Game.X) {
        this.currentTurn = Game.O;
      }
    }
  }

  checkForWinner() {
    //rows [0, 1, 2], [3, 4, 5], [6, 7, 8]
    for (let j = 0; j < 9; j = j + 3) {
      if (
        this.boxes[j].value != null &&
        this.boxes[j].value === this.boxes[j + 1].value &&
        this.boxes[j + 1].value === this.boxes[j + 2].value
      ) {
        this.winner = this.boxes[j].value;
        this.inProgress = false;
      }
    }
    //col [0, 3, 6], [1, 4, 7], [2, 5, 8]
    for (let j = 0; j < 3; j++) {
      if (
        this.boxes[j].value != null &&
        this.boxes[j].value === this.boxes[j + 3].value &&
        this.boxes[j + 3].value === this.boxes[j + 6].value
      ) {
        this.winner = this.boxes[j].value;
        this.inProgress = false;
      }
    }

    //[0, 4, 8]
    if (
      this.boxes[0].value != null &&
      this.boxes[0].value === this.boxes[4].value &&
      this.boxes[4].value === this.boxes[8].value
    ) {
      this.winner = this.boxes[4].value;
      this.inProgress = false;
    }
    //[2, 4, 6]

    if (
      this.boxes[2].value != null &&
      this.boxes[2].value === this.boxes[4].value &&
      this.boxes[4].value === this.boxes[6].value
    ) {
      this.winner = this.boxes[4].value;
      this.inProgress = false;
    }

    if (this.movesMade === this.boxes.length) {
      this.inProgress = false;
    }
  }
}

Game.O = "O";
Game.X = "X";

let activeGame = new Game();

let gameVue = new Vue({
  el: "#board",
  data: activeGame,
  computed: {
    infoMessage: function() {
      if (this.inProgress) {
        return this.currentTurn + "'S TURN!";
      }
      if (this.winner) {
        return this.winner + " WINS!!!";
      }
      if (!this.winner && !this.inProgress) {
        return "DRAW";
      }
    }
  }
});
