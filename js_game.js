//NOTE:
//This code is not functioning properly currently. I'm having trouble with the AND statements in certain IF logic, so they don't run properly.
const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

let snake = {
    length:2,
    headX:2,
    headY:16,
    currentHeading:"east",
    speed:1,
    gradualMovementCounter:0,
}

let fruit = {
    x:0,
    y:0,
}

let game ={
    highScore:0,
    currentScore:0,
    running:false,
}

const scoreIndicator = document.getElementById("currentScore");
const highScoreIndicator = document.getElementById("highScore");
const resetButton = document.getElementById("resetButton");

let snakePositions = [];
const keys = {};
let resetButtonPressed = false;

function drawBackground(){
    let x = 0;
    let y = 0;
    //Draw repeating rows of said columns
    for(let h = 0; h < 16; h++){
        //Draw repeating columns of alternating color squares
        for(let w = 0; w < 16; w++){
            ctx.fillStyle = "#1d991f";
            ctx.fillRect(x,y,20,20);
            ctx.fill();
            x = x+20;
            ctx.fillStyle = "#29c22b";
            ctx.fillRect(x,y,20,20);
            ctx.fill();
            x = x+20;
        }
        x = 0;
        y = y+40;
    }
    x=0;
    y=20;
    for(let h=0; h<16; h++){
        for(let w = 0; w < 16; w++){
            ctx.fillStyle = "#29c22b";
            ctx.fillRect(x,y,20,20);
            ctx.fill();
            x = x+20;
            ctx.fillStyle = "#1d991f";
            ctx.fillRect(x,y,20,20);
            ctx.fill();
            x = x+20;
        }
        x=0;
        y=y+40;
    }
}
function generateFruitPosition(){
    fruitRandomX = Math.floor(Math.random() * (32 - 1 + 1)) + 1;
    fruitRandomY = Math.floor(Math.random() * (32 - 1)) + 1;
    fruit.x = fruitRandomX;
    fruit.y = fruitRandomY;

}
function drawFruit(x,y){
    ctx.fillstyle = "#eb4034";
    ctx.fillRect(x,y,20,20);
    ctx.fill()
}
function logSnakePosition(x, y){
    let tempArray = [];
    tempArray.push(x,y);
    snakePositions.push(tempArray);
}
function moveSnake(){
    if(keys['ArrowUp'] || snake.currentHeading == "north"){
        snake.currentHeading = "north";
        if(snake.gradualMovementCounter >= 30){
            snake.headY -= snake.speed;
            snake.gradualMovementCounter = 0;
        }else{
            snake.gradualMovementCounter += 1;
        }
    }
    if(keys['ArrowDown'] || snake.currentHeading == "south"){
        snake.currentHeading = "south";
        if(snake.gradualMovementCounter >= 30){
            snake.headY += snake.speed;
            snake.gradualMovementCounter = 0;
        } else{
            snake.gradualMovementCounter += 1;
        }
    }
    if(keys['ArrowLeft'] || snake.currentHeading == "west"){
        snake.currentHeading = "west"
        if(snake.gradualMovementCounter >= 30){
            snake.headX -= snake.speed;
            snake.gradualMovementCounter = 0;
        } else{
            snake.gradualMovementCounter += 1;
        }
    }
    if(keys['ArrowRight'] || snake.currentHeading == "east"){
        snake.currentHeading = "east";
        if(snake.gradualMovementCounter >= 30){
            snake.headX += snake.speed;
            snake.gradualMovementCounter = 0;
        } else{
            snake.gradualMovementCounter += 1;
        }
    }

    if(snake.headX >= 32 && snake.currentHeading = "west"){
        snake.headX = 32;
        game.running = false;
    }
    if(snake.headX < 0 && snake.currentHeading = "east"){
        snake.headX = 0;
        game.running = false;
    }
    if(snake.headY >= 32 && snake.currentHeading = "south"){
        snake.headY = 32;
        edgeContact = false;
    }
    if(snake.headY < 0 && snake.currentHeading = "north"){
        snake.headY = 0;
        edgeContact = false;
    }
}
function checkCollisions(){
    if(snake.headX = fruit.x && snake.headY = fruit.y){
        snake.length += 1;
        game.currentScore += 1;
        if(game.currentScore > game.highScore){
            game.highScore = game.currentScore
        }
        generateFruitPosition();
    }
}
function drawSnake(headX, headY){
    ctx.fillStyle = "#0390fc";
    ctx.fillRect(headX*20, headY*20, 20, 20);
    ctx.fill();
    for(let i=0; i<snake.length; i++){
        let penX = snakePositions[snakePositions.length -i[0]];
        let penY = snakePositions[snakePositions.length -i[1]];
        ctx.fillStyle = "#0390fc";
        ctx.fillRect(penX*20, penY*20, 20, 20);
        ctx.fill();
    }
}
function checkGameStart(){
    if(keys['ArrowUp'] && game.running = false){
        game.running = true;
    }
    if(keys['ArrowDown'] && game.running = false){
        game.running = true;
    }
    if(keys['ArrowLeft'] && game.running = false){
        game.running = true;
    }
    if(keys['ArrowRight'] && game.running = false){
        game.running = true;
    }
}
function checkResetGame(){
    if(resetButtonPressed = true){
        game.currentScore = 0;
        snake.headX = 2;
        snake.headY = 16;
        game.running = true;
    }
}
function postGameScores(score, highScore){
    scoreIndicator.textContent("Score: " + game.currentScore);
    highScoreIndicator.textContent("High Score: " + game.highScore);
}
document.addEventListener('keydown', (e) =>{
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) =>{
    keys[e.key] = false;
});
resetButton.addEventListener('mouseup', () =>{
    resetButtonPressed = true;
});
function drawFrame(){
    drawBackground();
    logSnakePosition(snake.headX, snake.headY);
    drawFruit(fruit.x, fruit.y)
    moveSnake();
    drawSnake(snake.headX, snake.headY);
    requestAnimationFrame(drawFrame);
}
while(game.running = "false"){
    checkGameStart();
    checkResetGame();
}
