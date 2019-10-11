var dice = {
  sides: [1, 2, 3, 4, 5, 6],
  rollDice: function() {
    return sides[Math.round(Math.random() * 6)];
  }
};

var rolled = dice.rollDice();

console.log(rolled);
