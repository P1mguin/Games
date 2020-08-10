const blockSize = 30;
const xGrid = 60;
const yGrid = 25;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const W = 87;
const A = 65;
const S = 83;
const D = 68;

// This is the velocity of the snake
var dx = blockSize;
var dy = 0;

var dead = false;

// Move snake every interval
window.setInterval(moveSnake, 10);

// Make canvas cool and such
var game = document.getElementById("gameCanvas");

game.width = xGrid*2*blockSize;
game.height = yGrid*2*blockSize;

game.style.width = `${xGrid*blockSize}px`;
game.style.height = `${yGrid*blockSize}px`

var ctx = game.getContext("2d");

ctx.scale(2,2);

ctx.fillStyle= 'black';
ctx.fillRect(0, 0, game.width, game.height);

// Draw the snake and mark available spots for an apple
let snake = [];
let availables = [];
for (let i = 0; i < xGrid; i++) {
    for (let j = 0; j < yGrid; j++) {
        availables.push({
            x: i, y: j
        });
    }
}

// Initiate the snake
addSnake({x:4*blockSize, y:0*blockSize});
addSnake({x:3*blockSize, y:0*blockSize});
addSnake({x:2*blockSize, y:0*blockSize});
addSnake({x:1*blockSize, y:0*blockSize});
addSnake({x:0*blockSize, y:0*blockSize});
drawSnake();

// This adds a piece to the snake in a given place
function addSnake(snakePart){
    // Remove snake from the array of avaible apple spots
    availables.splice(availables.findIndex((element) => element.x === snakePart.x / blockSize && element.y === snakePart.y / blockSize), 1);
    snake.push(snakePart);
}

// This adds a visual piece to the snake
function addSnakeVisually(snakePart) {
    // Create the square
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, blockSize, blockSize);
    ctx.strokeRect(snakePart.x, snakePart.y, blockSize, blockSize);
}

// this removes a visual piece from the snake
function removeSnakeVisually(snakePart) {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.fillRect(snakePart.x, snakePart.y, blockSize, blockSize);
    ctx.strokeRect(snakePart.x, snakePart.y, blockSize, blockSize);
}

// This draws the snake visually
function drawSnake(){
    snake.forEach(addSnakeVisually);
}

// This clears the snake from the canvas
function clearSnakeVisually(){
    snake.forEach(removeSnakeVisually);
}

// Apple stuff
var apple;

createApple();

// Generates a new apple
function createApple(){
    let int = Math.floor(Math.random() * availables.length);
    apple = {
        x: availables[int].x * blockSize,
        y: availables[int].y * blockSize
    }
    drawApple(apple);
}

// Draws the new apple
function drawApple(appleSpot){
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'red';
    ctx.fillRect(appleSpot.x, appleSpot.y, blockSize, blockSize);
    ctx.strokeRect(appleSpot.x, appleSpot.y, blockSize, blockSize);
}

// Checks whether an apple has been eaten
function checkApple(){
    return snake[0].x === apple.x && snake[0].y === apple.y;
}

// Eats the apple
function eatApple(){
    createApple();
}

// Move stuff
function moveSnake(){
    if(dead){
        return;
    }

    checkDead();

    clearSnakeVisually();

    // Add the back of the snake to the available places for an apple
    availables.push({
        x: snake[snake.length - 1].x / blockSize,
        y: snake[snake.length - 1].y / blockSize
    });

    let temp = Object.create(snake[snake.length - 1]);

    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }

    // The head of the snake moves into the direction
    snake[0].x += dx;
    snake[0].y += dy;


    if(checkApple()){
        createApple();
        snake.push(temp);
        availables.splice(availables.findIndex( (element) => element.x === temp.x / blockSize && element.y === temp.y / blockSize), 1);
    }

    // Remove the head of the snake from the available places
    availables.splice(availables.findIndex((element) => element.x === snake[0].x / blockSize && element.y === snake[0].y / blockSize), 1);

    drawSnake();
}

document.addEventListener("keydown", changeDirection, false);

function changeDirection(e){
    switch(e.keyCode){
        case W || UP_KEY:
            if(dy === blockSize){
                break;
            }
            dx = 0
            dy = -blockSize
            break;
        case A || LEFT_KEY:
            if(dx === blockSize){
                break;
            }
            dx = -blockSize
            dy = 0;
            break;
        case S || DOWN_KEY:
            if(dy === -blockSize){
                break;
            }
            dx = 0
            dy = blockSize
            break;
        case D || RIGHT_KEY:
            if(dx === -blockSize){
                break;
            }
            dx = blockSize
            dy = 0
            break;
    }
}

// End of game
function checkDead(){
    if(snake[0].x + dx >= xGrid * blockSize|| snake[0].x + dx < 0 || snake[0].y + dy >= yGrid * blockSize|| snake[0].y + dy < 0){
        gameOver()
    }
}

function gameOver(){
    dead = true;
    game.remove()
    ctx.fillRect(0, 0, game.width, game.height);
}

