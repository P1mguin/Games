// Colours
const BACKGROUND = "#1f8aaa";
const DUCK = "#ffcd00";
const PIPE = "#359c1d";
const PIPE_BORDER = "#197902";


var game = document.getElementById("gameCanvas");
var ctx = game.getContext("2d");

// Initiate canvas
game.width = 1000;
game.height = 1600;

game.style.width = "500px";
game.style.height = "800px";

ctx.scale(2,2);

// Set background of canvas
ctx.fillStyle = BACKGROUND;
ctx.fillRect(0, 0, game.width, game.height);

var bird = {
    x: 80,
    y: 300,
    height: 30,
    width: 50,
    alive: true
}

// Create a bird
drawBird();
function drawBird(){
    ctx.fillStyle = DUCK;
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function removeBird(){
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

var dy = 2;

window.setInterval(gravity, 1);

var alerted = false;
function gravity(){
    // This pulls the bird down, like gravity; how odd
    removeBird();

    if(bird.y + bird.height < game.height / 2){
        bird.y += dy;
    } else {
        bird.alive = false;
        if(!alerted){
            alert(`You got a score of ${((pipes.length - 3 < 0) ? 0 : pipes.length - 3)}`);
            alerted = true;
        }
    }

    drawBird();
}

document.addEventListener('keypress', moveUp);
function moveUp(){
    dy = -3;
    setTimeout(function () {
        dy = 2;
    }, 300)
}

var pipes = [];
var score = 0;


generatePipe();
window.setInterval(generatePipe, 1500);
window.setInterval(movePipe, 1);
function generatePipe(){
    if(!bird.alive){
        return;
    }
    // A pipe needs to be avoided,
    // the gap in the pipe will be 3 times the birds height
    // Don't place the pipe too low, lets say a gap of 100 pixels either side of screen
    let topGap = (Math.floor(Math.random() * (Number.parseInt(game.style.height) - 200 - bird.height * 3) + 100));
    pipes.push({
        gap: topGap,
        x: game.width
    });
    drawPipe();
}

function drawPipe(){
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        // Pipe has width of bird
        ctx.fillStyle = PIPE;
        // Draw a line
        ctx.fillRect(pipe.x, 0, bird.width, Number.parseInt(game.style.height))
        // Draw the gap
        ctx.fillStyle = BACKGROUND;
        ctx.fillRect(pipe.x, pipe.gap, bird.width, 150);
    }
}

function clearPipe(){
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        // Pipe has width of bird
        ctx.fillStyle = BACKGROUND;
        ctx.fillRect(pipe.x, 0, bird.width, Number.parseInt(game.style.height))
    }
}

function movePipe(){
    if(!bird.alive){
        return;
    }
    clearPipe()
    removeBird();
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x--;
    }
    drawPipe();
    drawBird();
}