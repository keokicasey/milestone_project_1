// query selectors
let info = document.querySelector(".info");
const grid = document.querySelector(".grid");
let play = document.querySelector("#play");
let timer = document.querySelector("#timer");

// time variables
var seconds;
var minutes;

// object variables
const player = document.createElement("div");
let playerLeftSpace = 60;
let playerBottomSpace = 60;
let obstacleCount = 1;
let obstacles = [];
let firstObstacle;
let randomNumber;

// control state variables
let isJumping = false;
let isFalling = false;

// timer id variables
let upTimerId;
let downTimerId;
let obstacleTimerId;

// start timer function
function startTimer() {
    timerTimerId = setInterval(() => {
        seconds += 1;
        if (seconds >= 0 && seconds <= 9) {
            timer.textContent = minutes + ":" + "0" + seconds;
        };
        if (seconds >= 10 && seconds <= 59) {
            timer.textContent = minutes + ":" + seconds;
        };
        if (seconds == 60) {
            minutes += 1
            seconds = 0
            timer.textContent = minutes + ":" + "0" + seconds;
        };
    }, 1000);
};

// reset timer function
function resetTimer() {
    seconds = 0;
    minutes = 0;
    timer.textContent = minutes + ":" + "0" + seconds;
}

// create player function
function createPlayer() {
    grid.appendChild(player);
    player.classList.add("player");
    player.style.left = 60 + "px";
    player.style.bottom = 60 + "px";
};

// ground obstacle class
class GroundObstacle {
    constructor(newObstacleLeft) {
        this.left = newObstacleLeft;
        this.bottom = 60;
        this.visual = document.createElement("div");
        const visual = this.visual;
        visual.classList.add("obstacle");
        visual.style.left = this.left + "px";
        visual.style.bottom = this.bottom + "px";
        grid.appendChild(visual);
    };
};

// air obstacle class
class AirObstacle {
    constructor(newObstacleLeft) {
        this.left = newObstacleLeft;
        this.bottom = 90;
        this.visual = document.createElement("div");
        const visual = this.visual;
        visual.classList.add("obstacle");
        visual.style.left = this.left + "px";
        visual.style.bottom = this.bottom + "px";
        grid.appendChild(visual);
    };
}

// random number function
function getRandomNumber() {
    return randomNumber = Math.random()
}

// create obstacles function
function createObstacles() {
    if (obstacleTimerid = false) return;
    for (let i = 0; i < obstacleCount; i++) {
        let obstacleGgap = 830 / obstacleCount;
        let newObstacleLeft = 830 + (i * obstacleGgap);
        // randomly create ground or air obstacle
        getRandomNumber()
        if (randomNumber < .5) {
            let newObstacle = new GroundObstacle(newObstacleLeft);
            obstacles.push(newObstacle);
        } else {
            let newObstacle = new AirObstacle(newObstacleLeft);
            obstacles.push(newObstacle);
        }
    }
}

// move obstacles function 
function moveObstacles() {
    obstacleTimerId = setInterval(() => {
        obstacles.forEach((obstacle) => {
            obstacle.left -= 20;
            let visual = obstacle.visual;
            visual.style.left = obstacle.left + "px";

            // player/obstacle collision
            obstacles.forEach((obstacle) => {
                if (
                    ((playerBottomSpace + 60) >= obstacle.bottom) &&
                    (playerBottomSpace <= (obstacle.bottom + 50)) &&
                    ((playerLeftSpace + 60) >= obstacle.left) &&
                    (playerLeftSpace <= (obstacle.left + 30))
                ) {
                    gameOver();
                };
            });

            // delete obstacle
            if (obstacle.left < -60) {
                firstObstacle = obstacles[0].visual;
                firstObstacle.classList.remove("obstacle");
                obstacles.shift();

                // create new obstacle
                getRandomNumber()
                if (randomNumber < .5) {
                    let newObstacle = new GroundObstacle(830);
                    obstacles.push(newObstacle);
                } else {
                    let newObstacle = new AirObstacle(830);
                    obstacles.push(newObstacle);
                }
            };
        });
    }, 30);
};

// jump function
function jump() {
    if (isJumping) return;
    upTimerId = setInterval(() => {
        if (playerBottomSpace > 140) {
            clearInterval(upTimerId);
            downTimerId = setInterval(() => {
                if (playerBottomSpace <= 80) {
                    clearInterval(downTimerId);
                    isJumping = false;
                }
                playerBottomSpace -=20;;
                player.style.bottom = playerBottomSpace + "px";
            }, 30);
        }
        isJumping = true;
        playerBottomSpace += 20;
        player.style.bottom = playerBottomSpace + "px";
    }, 30);
};

// duck function
function duck() {
    if (isJumping) return;
    if (isFalling) return;
    playerBottomSpace = 29;
    player.style.height = "30px"
}

// controls function
function control(e) {
    if (e.key === "ArrowUp") {
        if (e.repeat) return;
        jump();
    };
    if (e.key === "ArrowDown") {
        duck()
        document.addEventListener("keyup", function (e) {
            if (e.key === "ArrowDown") {
                playerBottomSpace = 60;
                player.style.height = "60px"
            }
        })
    }
};

// game over function
function gameOver() {
    // clear timer ids
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(obstacleTimerId);
    clearInterval(timerTimerId);

    // clear control states
    isJumping = false;
    isFalling = false;

    // remove obstacles
    obstacles.forEach((i) => {
        firstObstacle = obstacles[0].visual;
        firstObstacle.classList.remove("obstacle");
        obstacles.shift();
    });

    // remove player
    player.remove();

    // leaves time shown after death
    if (seconds >= 0 && seconds <= 9) {
        timer.textContent = minutes + ":" + "0" + seconds;
    };
    if (seconds >= 10 && seconds <= 59) {
        timer.textContent = minutes + ":" + seconds;
    };

    // add play button
    info.appendChild(play);
};

// start function
function start() {
    // reset timer
    resetTimer();

    // remove play button
    play.remove();

    // start timer
    startTimer();

    // create and move obstacles
    createObstacles();
    moveObstacles();

    // create player
    createPlayer();

    // controls
    document.addEventListener("keydown", control);
}

// start the game
play.addEventListener("click", function() {
    start();
});