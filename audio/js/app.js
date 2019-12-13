//get it boi
// var myAudio = document.getElementById("myAudio");

// function playMainAudio() {
//   myAudio.play();
// }

// function stopMainAudio() {
//   myAudio.pause();
// }

var soundButtons = document.getElementById("soundButtons");
var count = 0;
var sounds = [
  "chimes_long.mp3",
  "click_clock_loop.mp3",
  "pop_10.mp3",
  "puff.mp3"
];

var soundElements = [];

//loop through all th sounds
sounds.forEach((soundURL, idx) => {
  //the sound
  var newSound = new Audio("sounds/" + soundURL);

  //store each in array
  soundElements.push(newSound);

  // ---------------------------------------------------------------------------------
  var soundNames = ["Chimes", "Click Clock", "Pop", "Puff"];

  var newButton = document.createElement("button");
  if (count == 0) {
    newButton.innerHTML = soundNames[0];
    count++;
  } else if (count == 1) {
    newButton.innerHTML = soundNames[1];
    count++;
  } else if (count == 2) {
    newButton.innerHTML = soundNames[2];
    count++;
  } else if (count == 3) {
    newButton.innerHTML = soundNames[3];
    count++;
  }

  //----------------------------------------------------------------------------------

  //store sound index
  newButton.setAttribute("data-sound-id", idx);

  //add to page
  soundButtons.appendChild(newButton);

  //click on btn
  newButton.addEventListener("click", playSoundInArray);
});

function playSoundInArray(event) {
  //get sound index
  var soundIndex = Number(event.target.getAttribute("data-sound-id"));

  //get sound from array
  var selectSound = soundElements[soundIndex];

  //play that sound
  selectSound.play();
}
