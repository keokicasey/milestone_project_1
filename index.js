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

const grid = document.querySelector(".grid")
const player = document.createElement("div")
let playerLeftSpace = 60
let playerBottomSpace = 60
let isGameOver;
let obstacleCount = 2
let obstacles = []
let upTimerId;
let downTimerId;
let isJumping = false;
let isFalling = false;
let obstacleTimerId = true;
let time = 0

function createPlayer() {
    grid.appendChild(player)
    player.classList.add("player")
    player.style.left = playerLeftSpace + "px"
    player.style.bottom = playerBottomSpace + "px"
}

class Obstacle {
    constructor(newObstacleLeft) {
        this.left = newObstacleLeft
        this.bottom = 60
        this.visual = document.createElement("div")

        const visual = this.visual
        visual.classList.add("obstacle")
        visual.style.left = this.left + "px"
        visual.style.bottom = this.bottom + "px"
        grid.appendChild(visual)
    }
}

function createObstacles() {
    if (obstacleTimerid = false) return;
    for (let i = 0; i < obstacleCount; i++) {
        let obstacleGgap = 800 / obstacleCount
        let newObstacleLeft = 800 + i * obstacleGgap
        let newObstacle = new Obstacle(newObstacleLeft)
        obstacles.push(newObstacle)
    }
}

function moveObstacles() {
    if (obstacleTimerId = false) return;
    obstacles.forEach((obstacle) => {
        obstacle.left -=8
        let visual = obstacle.visual
        visual.style.left = obstacle.left + "px"

        // player/obstacle collision
        obstacles.forEach((obstacle) => {
            if (
                (playerBottomSpace >= obstacle.bottom) &&
                (playerBottomSpace <= obstacle.bottom + 30) &&
                ((playerLeftSpace + 60) >= obstacle.left) &&
                (playerLeftSpace <= (obstacle.left + 30))
            ) {
                gameOver()
                obstacleTimerId = false;
            }
        })

        if (obstacle.left < 0) {
            let firstObstacle = obstacles[0].visual
            firstObstacle.classList.remove("obstacle")
            obstacles.shift()
            console.log(obstacles)
            let newObstacle = new Obstacle(710)
            obstacles.push(newObstacle)
        }
    })
}

function jump() {
    if (isJumping) return;
    clearInterval(downTimerId)
    isFalling = false;
    upTimerId = setInterval(() => {
        playerBottomSpace +=15
        player.style.bottom = playerBottomSpace + "px"
        if (playerBottomSpace > 200) {
            fall()
        }
    }, 30)
    isJumping = true;
}

function fall() {
    clearInterval(upTimerId)
    isJumping = false;
    isFalling = true;
    downTimerId = setInterval(() => {
        playerBottomSpace -=5
        player.style.bottom = playerBottomSpace + "px"
        if (playerBottomSpace <= 60) {
            clearInterval(downTimerId)
        }
    }, 30)
}

function gameOver() {
    console.log("game over")
    isGameOver = true;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
    // Display minutes + ":" + seconds
    clearInterval(upTimerId)
    clearInterval(downTimerId)
    obstacleTimerid = false;
}

function control(e) {
    if (e.key === "ArrowUp") {
        jump()
    }
}

function start() {
    if (!isGameOver)
    {
        startTimer()
        createPlayer()
        createObstacles()
        if (obstacleTimerId) {
            setInterval(moveObstacles, 30)

        }
        document.addEventListener("keydown", control)
    }
}

play.addEventListener("click", function() {

    // start the game
    start()
})