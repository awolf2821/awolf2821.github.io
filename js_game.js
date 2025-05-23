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
    x:5,
    y:16,
}

let game ={
    highScore:0,
    currentScore:0,
    running:false,
}

const scoreIndicator = document.getElementById("currentScore");
const highScoreIndicator = document.getElementById("highScore");
const resetButton = document.getElementById("resetButton");
let resetButtonPressed = false;

let snakePositions = [];
const keys = {};


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
    let validPosition = false;
    while(!validPosition){
        fruitRandomX = Math.floor(Math.random() * (32 - 1 + 1)) + 1;
        fruitRandomY = Math.floor(Math.random() * (32 - 1)) + 1;
        fruit.x = fruitRandomX;
        fruit.y = fruitRandomY;
    }
    validPosition = !snakePositions.some(pos => pos.x === fruit.x && pos.y === fruit.y);

}
function drawFruit(x,y){
    ctx.fillstyle = "#eb4034";
    ctx.fillRect(x*20,y*20,20,20);
    ctx.fill()
}
function logSnakePosition(x, y){
    let tempArray = [];
    tempArray.push(x,y);
    snakePositions.push(tempArray);
}
function moveSnake(){
    if(keys['ArrowUp'] && snake.currentHeading !== "south"){
        snake.currentHeading = "north";
        if(snake.gradualMovementCounter > 30){
            snake.headY -= snake.speed;
            snake.gradualMovementCounter = 0;
        }else{
            snake.gradualMovementCounter += 1;
        }
    }
    if(keys['ArrowDown'] && snake.currentHeading !== "north"){
        snake.currentHeading = "south";
        if(snake.gradualMovementCounter > 30){
            snake.headY += snake.speed;
            snake.gradualMovementCounter = 0;
        } else{
            snake.gradualMovementCounter += 1;
        }
    }
    if(keys['ArrowLeft'] && snake.currentHeading !== "east"){
        snake.currentHeading = "west"
        if(snake.gradualMovementCounter > 30){
            snake.headX -= snake.speed;
            snake.gradualMovementCounter = 0;
        } else{
            snake.gradualMovementCounter += 1;
        }
    }
    if(keys['ArrowRight'] && snake.currentHeading !== "west"){
        snake.currentHeading = "east";
        if(snake.gradualMovementCounter > 30){
            snake.headX += snake.speed;
            snake.gradualMovementCounter = 0;
        } else{
            snake.gradualMovementCounter += 1;
        }
    }

    if(snake.headX >= 32 && snake.currentHeading == "west"){
        snake.headX = 32;
        game.running = false;
    }
    if(snake.headX < 0 && snake.currentHeading == "east"){
        snake.headX = 0;
        game.running = false;
    }
    if(snake.headY >= 32 && snake.currentHeading == "south"){
        snake.headY = 32;
        game.running = false;
    }
    if(snake.headY < 0 && snake.currentHeading == "north"){
        snake.headY = 0;
        game.running = false;
    }
}
function checkCollisions(){
    if(snake.headX === fruit.x && snake.headY === fruit.y){
        snake.length += 1;
        game.currentScore += 1;
        if(game.currentScore > game.highScore){
            game.highScore = game.currentScore
        }
        generateFruitPosition();
        
    }
    for (let i = 0; i < snakePositions.length - 1; i++) {
        const segment = snakePositions[i];
        if (segment.x === snake.headX && segment.y === snake.headY) {
            console.log("Game Over: Snake collided with itself");
            game.running = false; // Stop the game
            return;
        }
    }
}
function drawSnake(headX, headY) {
    // Add the new head position to the snakePositions array
    snakePositions.push({ x: headX, y: headY });
    // Keep only the last `snake.length` positions
    while (snakePositions.length > snake.length) {
        snakePositions.shift(); // Remove the oldest position
    }
    // Draw the snake
    ctx.fillStyle = "#0390fc";
    for (let i = 0; i < snake.length; i++) {
        const segment = snakePositions[snakePositions.length - 1 - i];
        if (segment) {
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        }
    }
}
function checkGameStart(){
    if(keys['ArrowUp'] && game.running == false){
        game.currentScore = 0;
        snake.headX = 2;
        snake.headY = 16;
        game.running = true;
    }
    if(keys['ArrowDown'] && game.running == false){
        game.currentScore = 0;
        snake.headX = 2;
        snake.headY = 16;
        game.running = true;
    }
    if(keys['ArrowLeft'] && game.running == false){
        game.currentScore = 0;
        snake.headX = 2;
        snake.headY = 16;
        game.running = true;
    }
    if(keys['ArrowRight'] && game.running == false){
        game.currentScore = 0;
        snake.headX = 2;
        snake.headY = 16;
        game.running = true;
    }
}
function checkResetGame(){
    if(resetButtonPressed == true){
        game.currentScore = 0;
        snake.headX = 2;
        snake.headY = 16;
        resetButtonPressed = false;
        game.running = true;
    }
}
function postGameScores(score, highScore){
    scoreIndicator.textContent = "Score: " + game.currentScore;
    highScoreIndicator.textContent = "High Score: " + game.highScore;
}
document.addEventListener('keydown', (e) =>{
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) =>{
    keys[e.key] = false;
});
resetButton.addEventListener('click', () =>{
    resetButtonPressed = true;
});
function drawFrame(){
    if (!game.running) {
        return;
    }
    drawBackground();
    moveSnake();
    drawSnake(snake.headX, snake.headY);
    drawFruit(fruit.x, fruit.y)
    checkCollisions();
    postGameScores(game.currentScore, game.highScore);
    game.running = true;
    requestAnimationFrame(drawFrame);
}
function checkGameState(){
    if(!game.running){
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", c.width / 2 - 70, c.height / 2);
        ctx.fillText("Press any arrow key or the reset button to start", c.width / 2 - 150, c.height / 2 + 40);
        checkGameStart();
        checkResetGame();
        drawBackground();
        requestAnimationFrame(checkGameState);
    } else {
        drawFrame();
    }
}
checkGameState();