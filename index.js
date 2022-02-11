// query selectors
let timer = document.querySelector("#timer");
let play = document.querySelector("#play");

// create player character
const element = document.createElement("div");
element.style.width = "96px";
element.style.height = "96px";
element.style.backgroundColor = "black";
element.style.position = "fixed";
element.style.bottom = "201px";
element.style.left = "201px";

// timer


// jump function
function jump() {

}

// slide function
function slide() {
    element.style.height = "48px";
}

// obstacle object
    // obstacle comes from right side of screen towards left side of screen
    // if player collides with obstacle, game over

// start the game
play.addEventListener("click", function() {
    console.log("clicked")
    play.style.display = "none";
    document.body.append(element)

    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowDown") {
            slide()
        }

    document.addEventListener("keyup", function(e) {
        if (e.key === "ArrowDown") {
            element.style.height = "96px";
        }
    })
    })
});