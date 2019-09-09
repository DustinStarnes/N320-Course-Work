//Dustin Starnes 9/5/19

//-----------------------classes-----------------------//
//class that stores the raindrops inside an array
class RainCloud {
  //constructer that makes an array
  constructor() {
    this.drops = [];
    this.dropsHitGround = 0;
  }

  //method that makes a raindrop (will be called on by chance in the draw function (P5))
  createDrop() {
    var newDrop = new Drop();

    //pushes the newly made drop into the classes array
    this.drops.push(newDrop);
  }

  //method that goes through the array and then runs the drops update method that moves the drop, called on in the draw function (P5)
  update() {
    for (var i = 0; i < this.drops.length; i++) {
      this.drops[i].update();
    }
  }

  //method that goes through the array of drops and checks if any of them hit the ground, called on in draw function (P5)
  hitGround() {
    for (var i = 0; i < this.drops.length; i++) {
      //if the drop hits the ground it is removed from the array and then runs the grounds addColor method
      if (this.drops[i].y > 590) {
        this.drops.splice(i, 1);

        //adds one to the drop counter
        this.dropsHitGround++;
      }

      //if statement that adds color to ground for every 10 drops that hits the ground, then resets the dropsHitGround counter
      if (this.dropsHitGround == 10) {
        //adds color to ground layer
        ground.addColor();

        //resets the var
        this.dropsHitGround = 0;
      }
    }
  }
}

//class that makes the rain drops
class Drop {
  //constructor that gives a drop its x and y coordinates, x is random
  constructor() {
    this.x = Math.round(Math.random() * 600);
    this.y = 0;

    //gives the drop a var that tells it its velocity
    if (Math.random() > 0.33) {
      this.yVel = 1;
    } else if (0.33 < Math.random() > 0.66) {
      this.yVel = 2;
    } else {
      this.yVel = 3;
    }

    //gives the drop a random width (rect)
    if (Math.random() > 0.5) {
      this.width = 2;
    } else {
      this.width = 1;
    }

    //gives the drop a random height (rect)
    this.height = Math.random() * 10;
  }

  //method that gives the drop velocity and draws it on screen, called in draw function (P5)
  update() {
    //checkes the var that sets the velecity (did this way so the drops dont stutter)
    if (this.yVel == 1) {
      this.y = this.y + 1.5;
    } else if (this.yVel == 2) {
      this.y = this.y + 2;
    } else {
      this.y = this.y + 2.5;
    }

    //draws the drop
    fill(220, 247, 247);
    strokeWeight(0);
    rect(this.x, this.y, this.width, this.height);
  }
}

//class that makes the ground layer
class Ground {
  //constructor that gives a rect a h,w,x,y. Also gives it a var that will change the blue value of rgb
  constructor() {
    this.height = 10;
    this.width = 600;
    this.groundColor = 33;
  }

  //if rainCloud.hitGround is true then it will add +1 to ground color increasing the blue value
  addColor() {
    this.groundColor++;
  }

  //draws the ground layer on the canvas 38, 33, 33
  draw() {
    fill(38, 33, this.groundColor);
    strokeWeight(0);
    rect(0, 590, this.width, this.height);
  }
}
//-----------------------Starting Program--------------------//
//making the ground
var ground = new Ground();
var rainCloud = new RainCloud();

//start up function, only making a canvas
function setup() {
  createCanvas(600, 600);
}

//draw function, runs 60 times per sec
function draw() {
  //redraws background
  background(38, 33, 33);

  //creates a drop at a 2% chance
  if (Math.random() < 0.2) {
    rainCloud.createDrop();
  }

  //draws the ground layer
  ground.draw();

  //runs the update method checking for drops in the rainCloud
  rainCloud.update();

  //runs the method that checks if the drops have hit the ground
  rainCloud.hitGround();
}
