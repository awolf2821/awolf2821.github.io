const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

let snake = {
    length:2,
    headX:2,
    headY:16,
    currentHeading:"east",
    speed:0.01,
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
    fruitRandomX = Math.floor(Math.random() * (32 - 1 + 1)) + 1;
    fruitRandomY = Math.floor(Math.random() * (32 - 1)) + 1;
    fruit.x = fruitRandomX;
    fruit.y = fruitRandomY;
    // Check if the fruit position overlaps with the snake
    if(fruit.x == snake.headX && fruit.y == snake.headY){
        generateFruitPosition(); // Regenerate if it overlaps
    }
}
function drawFruit(x,y){
    ctx.fillstyle = "#eb4034";
    ctx.beginPath();
    ctx.arc(x * 20 + 10, y * 20 + 10, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill()
}
function logSnakePosition(x, y){
    let tempArray = [];
    tempArray.push(x,y);
    snakePositions.push(tempArray);
}
function moveSnake(){
    if(keys['ArrowUp'] && snake.currentHeading !== "north"){
        snake.currentHeading = "north";
        snake.headY -= snake.speed;
    }
    if(keys['ArrowDown'] && snake.currentHeading == "south"){
        snake.currentHeading = "south";
        snake.headY += snake.speed;
    }
    if(keys['ArrowLeft'] && snake.currentHeading == "west"){
        snake.currentHeading = "west"
        snake.headX -= snake.speed;
    }
    if(keys['ArrowRight'] && snake.currentHeading == "east"){
        snake.currentHeading = "east";
        snake.headX += snake.speed;
    }
    //Gradual movement
    snake.headX = Math.floor(snake.headX);
    snake.headY = Math.floor(snake.headY);
}
function checkCollisions() {
    console.log("Checking collisions...");
    console.log("Snake Head:", { x: snake.headX, y: snake.headY });
    console.log("Snake Positions:", snakePositions);
    if (snake.headX === fruit.x && snake.headY === fruit.y) {
        console.log("Fruit eaten!");
        snake.length += 1;
        game.currentScore += 1;
        if (game.currentScore > game.highScore) {
            game.highScore = game.currentScore;
        }
        generateFruitPosition();
    }
    for (let i = 0; i < snakePositions.length; i++) {
        const segment = snakePositions[i];
        if (segment.x === snake.headX && segment.y === snake.headY) {
            console.log("Game Over: Snake collided with itself");
            game.running = false; // Stop the game
            return;
        }
    }
    if (snake.headX < 0 || snake.headX >= c.width / 20 || snake.headY < 0 || snake.headY >= c.height / 20) {
        console.log("Game Over: Snake hit the edge");
        game.running = false;
        return;
    }
}
function drawSnake(headX, headY) {
    // Add the new head position to the snakePositions array
    // Draw the snake
    ctx.fillStyle = "#0390fc";
    for (let i = 0; i < snake.length; i++) {
        const segment = snakePositions[snakePositions.length - 1 - i];
        if (segment) {
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        }
    }
}
function logSnakePositions(headX, headY){
    snakePositions.push({ x: headX, y: headY });
    // Keep only the last `snake.length` positions
    while (snakePositions.length > snake.length) {
        snakePositions.shift(); // Remove the oldest position
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
function checkResetGame() {
    if (keys['r']) {
        // Reset the game state
        console.log("Detected 'r' key press, resetting game...");
        game.currentScore = 0;
        snake.headX = 2;
        snake.headY = 16;
        snake.currentHeading = "east";
        snake.length = 2;
        snakePositions = [];
        fruit.x = 5;
        fruit.y = 16;
        game.running = true; // Restart the game
        console.log("Game reset!");
    }
}
function postGameScores(score, highScore){
    scoreIndicator.textContent = "Score: " + game.currentScore;
    highScoreIndicator.textContent = "High Score: " + game.highScore;
}
function drawFrame() {
    if (!game.running) {
        return; 
    }

    ctx.clearRect(0, 0, c.width, c.height);
    drawBackground();
    moveSnake();
    drawSnake(snake.headX, snake.headY);
    checkCollisions();
    logSnakePositions(snake.headX, snake.headY);
    drawFruit(fruit.x, fruit.y);
    postGameScores(game.currentScore, game.highScore);
    requestAnimationFrame(drawFrame);
}

// Continuously check for reset input
function gameLoop() {
    if (!game.running) {
        checkResetGame(); 
    } else {
        drawFrame(); 
    }
    requestAnimationFrame(gameLoop);
}
document.addEventListener('keydown', (e) =>{
    keys[e.key] = true;
    console.log("Pressed: " + e.key);
});
document.addEventListener('keyup', (e) =>{
    keys[e.key] = false;
    console.log("Released: " + e.key);
});
gameLoop(); // Start the game loop