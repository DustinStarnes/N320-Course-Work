//Dustin Starnes
let boxOfBoxes = document.querySelector("#boxOfBoxes");

let x = 0;

for (i = 0; i < 6; i++) {
  let newBox = document.createElement("div");
  newBox.classList.add("box");

  newBox.addEventListener("mouseover", onBoxOver);
  newBox.addEventListener("mouseout", onBoxOut);
  newBox.addEventListener("click", onBoxClick);

  newBox.style.animationDelay = x * 0.2 + "s";
  x++;

  boxOfBoxes.appendChild(newBox);
}

function onBoxOver(event) {
  event.target.classList.add("boxOver");
  event.target.style.animationDelay = "0s";
  event.target.classList.remove("boxOut");
}

function onBoxOut(event) {
  event.target.classList.add("boxOut");
  event.target.classList.remove("boxOver");
}

function onBoxClick(event) {
  event.target.classList.add("clicked");
}
