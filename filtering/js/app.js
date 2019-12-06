var canvas = document.getElementById("renderCanvas");
var rgCost = document.getElementById("rgCost");
var filterButtons = document.querySelectorAll(".filterNav");
var camera, scene, selectedPieces;
var infoBox = document.getElementById("#infoBox");
var selectedType = "all";

//console.log(filterButtons);
//app setup stuff
fetch("data/furniture.json", { method: "get" })
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;

    data.furniture.forEach((piece, idx) => {
      var p = BABYLON.SceneLoader.ImportMesh(
        "",
        "./models/house/",
        piece.asset,
        scene,
        meshes => {
          var containerNode = new BABYLON.TransformNode("root");
          piece.asset = containerNode;
          piece.asset.dataId = idx;

          meshes.forEach(mesh => {
            mesh.parent = containerNode;
          });
        }
      );
    });
  });

//engine stuff
var engine = new BABYLON.Engine(canvas, true);

scene = createScene();
engine.runRenderLoop(function() {
  scene.render();
});

function createScene() {
  var scene = new BABYLON.Scene(engine);

  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 4,
    4,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  //Add lights to the scene
  var myLight = new BABYLON.PointLight(
    "dir01",
    new BABYLON.Vector3(0, -0.5, 1),
    scene
  );

  // var bed = BABYLON.SceneLoader.Append(
  //   "./models/house/",
  //   "bathroomMirror.obj",
  //   scene
  // );

  return scene;
}

//application function
function selectType(event) {
  //remeber what was selected
  selectedType = event.target.getAttribute("data-type");

  //reset selected class
  filterButtons.forEach(button => {
    button.classList.remover("selected");
  });

  //add selected class
  event.target.classList.add("selected");
}

function showAvailable() {
  var ammount = Number(rgCost.value);

  selectedPiecies = data.furniture.filter(piece => {
    if (selectedType == "all") {
      return piece.price < ammount;
    } else {
      return piece.price < ammount && piece.type == selectedType;
    }
  });
  //console.log(selectedPieces);

  data.furniture.forEach(piece => {
    TweenLite.to(piece.asset.position, 0.7, { y: 5, onComplete: showFiltered });
  });
}

function showFiltered() {
  selectedPieces.forEach((piece, idx) => {
    TweenLite.to(piece.asset.position, 0.7, { y: 0, x: idx });
  });
}

window.addEventListener("click", function() {
  var pickResult = scene.pick(scene.pointerX, scene.pointerY);
  var selectedObject = pickResult.pickedMesh;

  if (selectedObject) {
    var dataId = selectedObject.parent.dataId;

    var itemInfo = data.furniture[dataId];
    infoBox.innerHTML = `${itemInfo.style} ${itemInfo.type} : $$(itemInfo.price)`;
  }
});
