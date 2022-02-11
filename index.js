// query selectors
let timer = document.querySelector("#timer");
let play = document.querySelector("#play");

// timer
timer = 0;

// player character
function playerCharacter() {

    const element = document.createElement("div");
    element.style.position = "fixed";
    element.style.width = "64px";
    element.style.height = "64px";
    element.style.bottom = "201px";
    element.style.backgroundColor = "black";
    document.body.append(element)

    // jump function
    function jump() {

    }

    // slide function
    function slide() {

    }

}

// obstacle object
    // obstacle comes from right side of screen towards left side of screen
    // if player collides with obstacle, game over

// start the game
play.addEventListener("click", function() {
    console.log("clicked")
    play.style.display = "none";
    playerCharacter();
});