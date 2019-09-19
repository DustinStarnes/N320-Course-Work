//Used an observer pattern
class Ball {
  constructor() {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 10, y: 0 };
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    circle(this.position.x, this.position.y, 20);

    if (this.position.x < 0 || this.position.x > 400) {
      World.ballBeyond(this);
      //when the ball hits the wall then it will run the box.update which makes the size bigger.
      box.update();
    }
  }
}

//class for the box, known by the ball class
class Box {
  constructor() {
    //startings box size
    this.size = 5;
  }

  //called upon in the ball class when the ball goes over the world
  update() {
    this.size += 5;
  }

  //draws the square
  drawSquare() {
    square(1, 1, this.size);
  }
}

//world know by the ball class
var World = {
  bgcolor: [237, 119, 83],
  ballBeyond: function(whichBall) {
    this.bgcolor = [Math.random() * 255, Math.random() * 255, 83];
    whichBall.position.x = 100;
    whichBall.velocity.x = (Math.random() - 0.5) * 20;
  }
};

//class for a box
//Grows in size every time a ball hits an edge and is reset
// "For fun": multiple balls

var ball = new Ball();
let box = new Box();

function setup() {
  createCanvas(400, 300);
}

//draws the stuff on the screen
function draw() {
  background(World.bgcolor);
  ball.update();
  box.drawSquare();
}
