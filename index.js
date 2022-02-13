// query selectors
let timer = document.querySelector("#timer");
let play = document.querySelector("#play");


// time variables
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


// new object function
function newObject(name, width, height, hex) {
    const element = document.createElement("div");
    const elementID = document.createAttribute("id")
    elementID.value = name;
    element.style.width = width + "px"
    element.style.height = height + "px"
    element.style.backgroundColor = "#" + hex
    document.body.append(element)
    return element;
}


// create player object
const player = newObject("player", 96, 96, "9AA57C")


// create ground obstacle object
const groundObstacle = newObject("groundObstacle", 48, 48, "4B564D")


// create air obstacle object
const airObstacle = newObject("airObstacle", 96, 192, "4B564D")


// move function
function move(element, x, y) {
    element.style.position = "fixed";
    element.style.left = x + "px";
    element.style.bottom = y + "px";
}


// move player object
move(player, 200, 200)


// move ground obstacle object
move(groundObstacle, 392, 200)


// move air obstacle object
move(airObstacle, 584, 248)


// jump function
function jump() {

}


// collision detection



// start the game
play.addEventListener("click", function() {


    // remove play button
    play.style.display = "none";


    // start timer
    startTimer()


});