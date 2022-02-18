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
let upTimerId;
let downTimerId;
let isJumping = false;
let isFalling = false;
let obstacleTimerId;
let firstObstacle;

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

class Obstacle {
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

// create obstacles function
function createObstacles() {
    if (obstacleTimerid = false) return;
    for (let i = 0; i < obstacleCount; i++) {
        let obstacleGgap = 830 / obstacleCount;
        let newObstacleLeft = 830 + (i * obstacleGgap);
        let newObstacle = new Obstacle(newObstacleLeft);
        obstacles.push(newObstacle);
    }
}

// move obstacles function 
function moveObstacles() {
    obstacleTimerId = setInterval(() => {

        obstacles.forEach((obstacle) => {
            obstacle.left -=20;
            let visual = obstacle.visual;
            visual.style.left = obstacle.left + "px";
    
            // player/obstacle collision
            obstacles.forEach((obstacle) => {
                if (
                    (playerBottomSpace >= obstacle.bottom) &&
                    (playerBottomSpace <= (obstacle.bottom + 30)) &&
                    ((playerLeftSpace + 60) >= obstacle.left) &&
                    (playerLeftSpace <= (obstacle.left + 30))
                ) {
                    gameOver();
                };
            });
    
            if (obstacle.left < -60) {
                firstObstacle = obstacles[0].visual;
                firstObstacle.classList.remove("obstacle");
                obstacles.shift();
                let newObstacle = new Obstacle(830);
                obstacles.push(newObstacle);
            };
        });

    }, 30);

};

// jump function
function jump() {
    if (isJumping) return;
    upTimerId = setInterval(() => {
        if (playerBottomSpace > 200) {
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

// game over function
function gameOver() {
    obstacles.forEach((i) => {
        firstObstacle = obstacles[0].visual;
        firstObstacle.classList.remove("obstacle");
        obstacles.shift();
    });
    player.remove();
    console.log("game over");
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    if (seconds >= 0 && seconds <= 9) {
        timer.textContent = minutes + ":" + "0" + seconds;
        console.log(minutes + ":" + "0" + seconds);
    };
    if (seconds >= 10 && seconds <= 59) {
        timer.textContent = minutes + ":" + seconds;
        console.log(minutes + ":" + seconds);
    };
    info.appendChild(play);
    clearInterval(obstacleTimerId);
    clearInterval(timerTimerId);
    isJumping = false;
    
};

function control(e) {
    if (e.key === "ArrowUp") {
        if (e.repeat) return;
        jump();
    };
};

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

    // jump
    document.addEventListener("keydown", control);
}

play.addEventListener("click", function() {
    start();
});