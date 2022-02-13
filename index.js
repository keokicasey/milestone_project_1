// query selectors
let timer = document.querySelector("#timer");
let play = document.querySelector("#play");


// time variables
var seconds = 0;
var minutes = 0;

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


// position function
function position(element, x, y) {
    element.style.position = "fixed";
    element.style.left = x + "px";
    element.style.bottom = y + "px";
}

// position player object
position(player, 200, 200)

// position ground obstacle object
position(groundObstacle, 392, 200)

// position air obstacle object
position(airObstacle, 584, 249)


// control variables
let left;
let bottom = 200;
let isJumping = false;
let isDucking = false;
let isMoving = false;


// jump function
function jump() {
    if (isJumping) return;
    if (isDucking) return;
    let timerUpId = setInterval(() => {
        if (bottom > 344) {
            clearInterval(timerUpId);
            let timerDownId = setInterval(() => {
                if (bottom <= 212) {
                    clearInterval(timerDownId);
                    isJumping = false;
                }
                bottom -= 12;;
                player.style.bottom = bottom + "px";
            }, 20);
        }
        isJumping = true;
        bottom += 12;
        player.style.bottom = bottom + "px";
    }, 20);
};


// move function
async function move(element, start, finish) {
    element.style.position = "fixed"
    element.style.left = start + "px"
    left = start
    let moveTimerId = setInterval(() => {
        isMoving = true;
        left -= 2
        element.style.left = left + "px"
        if (left < finish) {
            clearInterval(moveTimerId)
            element.style.left = start + "px"
            isMoving = false;
        }
        return element;
    }, 1)
}


// collision detection



// start the game
play.addEventListener("click", function() {


    // remove play button
    play.style.display = "none";


    // start timer
    startTimer()


    setInterval(() => {
        if (isMoving) return;
        move(airObstacle, 2000, -100)
    }, 5000)


    // jump and duck functions
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowUp") {
            if (e.repeat) return;
            jump()
        }
        if (e.key === "ArrowDown") {
            if (isJumping) return;
            player.style.height = "48px"
            isDucking = true;
        }
    })


    // unDuck function
    document.addEventListener("keyup", function(e) {
        if (e.key === "ArrowDown") {
            player.style.height = "96px"
            isDucking = false;
        }
    })


});