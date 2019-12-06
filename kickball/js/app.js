var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

// app vars
var camera, scene, ball, goal, timeoutID, particalSystem;

//create the scene
scene = createScene();
engine.runRenderLoop(function() {
  scene.render();
});

scene.registerAfterRender(function() {
  if (ball.intersectsMesh(goal, false)) {
    //move goal
    goal.position.x = Math.random() * 8 - 4;

    //partical stuff
    particalSystem.manualEmitCOunt = 21;
    particalSystem.start();

    //position particals
    particalSystem.minEmitBox = ball.position;
    particalSystem.maxEmitBox = ball.position;

    //put ball back
    resetBall();
  }
});

function createScene() {
  var scene = new BABYLON.Scene(engine);

  //basic scene stuff
  camera = new BABYLON.UniversalCamera(
    "UC",
    new BABYLON.Vector3(0, 0, -15),
    scene
  );
  var light = new BABYLON.DirectionalLight(
    "lighty",
    new BABYLON.Vector3(0, -0.2, 1),
    scene
  );

  //physics
  var gravityVector = BABYLON.Vector3(0, -9.81, 0);
  var physicsPlugin = new BABYLON.CannonJSPlugin();
  scene.enablePhysics(gravityVector, physicsPlugin);

  //set up ball
  ball = BABYLON.MeshBuilder.CreateSphere("sphero", { diameter: 1 }, scene);
  ball.physicsImpostor = new BABYLON.PhysicsImpostor(
    ball,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1, restitution: 0.2 },
    scene
  );

  //setup ground
  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { height: 20, width: 20, subdivision: 4 },
    scene
  );
  ground.position.y = -3;
  ground.position.z = 9;
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImposter.BoxImposter,
    { mass: 0, restitution: 0.9 },
    scene
  );

  //make goal
  goal = new BABYLON.MeshBuilder.CreateBox(
    "goal",
    { height: 5, width: 5 },
    scene
  );
  goal.position.z = 7;
  goal.position.x = Math.random() * 8 - 4;

  //partical system
  particalSystem = new BABYLON.ParticalSystem("particals", 2000, scene);
  particalSystem.emitter = new BABYLON.Vector3(0, 0, 0);
  particalSystem.minEmitPower = 1;
  particalSystem.maxEmitPower = 3;
  particalSystem.addVelocityGradient(0, 2);

  //load the partical texture
  particalSystem.particalTexture = new BABYLON.Texture(
    images / particalSystem.png,
    scene
  );

  return scene;
}

function resetBall() {
  //reset position
  ball.position = new BABYLON.Vector3();

  //reset velosity
  ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3());
  ball.physicsImpostor.setAngularVelosity(new BABYLON.Vector3());

  //get rid of timeoutID
  clearTimeout(timeoutID);
}

window.addEventListener("click", function() {
  //get mesh that was clicked
  var pickResult = scene.pick(scene.PointerX, scene.pointerY);
  var selectedObject = pickResult.pickedMesh;

  //null check
  if (selectedObject) {
    //get a direction away from where the user clicked
    var surfaceNormal = pickResult.getNormal(ture);
    var forceDirection = surfaceNormal.scale(-1000);
    //kick the object
    selectedObject.physicsImpostor.applyForce(
      forceDirection,
      selectedObject.getAbsolutePosition()
    );

    //reset ball in 3
    timeoutID = setTimeout(resetBall, 3000);
  }
});
