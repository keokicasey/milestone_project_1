// query selectors
let timer = document.querySelector("#timer");
let play = document.querySelector("#play");


// create player character
const element = document.createElement("div");
const elementID = document.createAttribute("id");
elementID.value = "player";
element.setAttributeNode(elementID);
element.style.width = "96px";
element.style.height = "96px";
element.style.borderStyle = "solid";
element.style.borderWidth = "3px";
element.style.position = "fixed";
element.style.bottom = "200px";
element.style.left = "200px";

var seconds = 0
var minutes = 0

// timer
function startTimer() {
    setInterval(() => {
        seconds += 1;
        if (seconds >= 0 && seconds <= 9) {
            timer.textContent = minutes + ":" + "0" + seconds;
        }
        if (seconds >= 10 && seconds <= 59) {
            timer.textContent = minutes + ":" + seconds;
        }
        if (seconds == 60) {
            minutes += 1
            seconds = 0
            timer.textContent = minutes + ":" + "0" + seconds;
        }
    }, 1000) 
}


// obstacle object
    // obstacle comes from right side of screen towards left side of screen
    // if player collides with obstacle, game over

// start the game
play.addEventListener("click", function() {


    // remove play button
    play.style.display = "none";


    // start timer
    startTimer()


    // append player character to body
    document.body.append(element)


    // handle slide function
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowDown") {
            element.style.height = "48px";
        }
    })
    document.addEventListener("keyup", function(e) {
        if (e.key === "ArrowDown") {
            element.style.height = "96px";
        }
    })


    // handle jump function
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowUp") {
            element.style.bottom = "296px"
        }
    })
    document.addEventListener("keyup", function(e) {
        if (e.key === "ArrowUp") {
            element.style.bottom = "200px"
        }
    })
});