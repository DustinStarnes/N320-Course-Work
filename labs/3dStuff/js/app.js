var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var camera;

var sphere, light, blueMat;
var selectedMesh = null;
var lesserSphere;

var scene = createScene(); //Call the createScene function

function createScene() {
  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  // Add a camera to the scene and attach it to the canvas
  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 4,
    4,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  // Add lights to the scene
  var myLight = new BABYLON.DirectionalLight(
    "dir01",
    new BABYLON.Vector3(0, -0.5, 1.0),
    scene
  );

  // Add and manipulate meshes in the scene
  sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.7 }, scene);
  lesserSphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere2",
    { diameter: 0.2 },
    scene
  );
  lesserSphere.position.z = 1;

  var lesserSphere2 = BABYLON.MeshBuilder.CreateSphere(
    "sphere3",
    { diameter: 0.2 },
    scene
  );
  lesserSphere2.position.z = 1.5;

  sphere.addChild(lesserSphere);
  light = new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );
  sphere.addChild(lesserSphere2);
  light = new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  blueMat = new BABYLON.StandardMaterial("ground", scene);
  blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  blueMat.emissiveColor = BABYLON.Color3.Blue();

  return scene;
}

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
  //sphere.rotate(BABYLON.Axis.Y, .01, BABYLON.Space.WORLD);

  TweenLite.to(lesserSphere.rotation, 1, {
    x: "+=.5",
    onComplete: checkUp
  });
  scene.render();
});

function checkUp() {
  console.log(selectedMesh.rotation.y);
}
function orbit() {
  console.log("orbiting");
}
window.addEventListener("keydown", event => {
  if (selectedMesh) {
    if (event.keyCode == 87) {
      TweenLite.to(selectedMesh.rotation, 1, {
        x: "+=.5",
        onComplete: checkUp
      });
    }
  }
});

window.addEventListener("keydown", event => {
  if (selectedMesh) {
    if (event.keyCode == 83) {
      TweenLite.to(selectedMesh.rotation, 1, {
        x: "-=20",
        onComplete: checkUp
      });
    }
  }
});

window.addEventListener("click", function() {
  // We try to pick an object
  var pickResult = scene.pick(scene.pointerX, scene.pointerY);

  pickResult.pickedMesh.material = blueMat;

  selectedMesh = pickResult.pickedMesh;
});
