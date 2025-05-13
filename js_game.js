const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

let snake = {
    length:1,
    headX:2,
    headY:16,
    currentHeading:"east",
    speed:1,
}

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
function logSnakePosition(x, y){
    let tempArray = [];
    tempArray.push(x,y);
    snakePositions.push(tempArray);
}
function moveSnake(){
    if(keys['ArrowUp'] || snake.currentHeading == "north"){
        snake.currentHeading = "north";
        snake.headY += snake.speed;
    }
    if(keys['ArrowDown'] || snake.currentHeading == "south"){
        snake.currentHeading = "south";
        snake.headY -= snake.speed;
    }
    if(keys['ArrowLeft'] || snake.currentHeading == "west"){
        snake.currentHeading = "west"
        snake.headX -= snake.speed;
    }
    if(keys['ArrowRight'] || snake.currentHeading == "east"){
        snake.currentHeading = "east";
        snake.headX += snake.speed;
    }

}

function drawSnake(headX, headY){
    ctx.fillStyle = "#0390fc";
    ctx.fillRect(headX*20, headY*20, 20, 20);
    ctx.fill();
    for(let i=0; i<snake.length; i++){
        let penX = snakePositions[snakePositions.length - i[0]];
        let penY = snakePositions[snakePositions.length -i[1]];
        ctx.fillStyle = "#0390fc";
        ctx.fillRect(penX*20, penY*20, 20, 20);
        ctx.fill();
    }
}
drawBackground();
function drawFrame(){
    logSnakePosition(snake.headX, snake.headY);
    document.addEventListener('keydown', (e) =>{
        keys[e.key] = true;
    });
    document.addEventListener('keyup', (e) =>{
        keys[e.key] = false;
    });
    moveSnake();
    drawSnake(snake.headX, snake.headY);
}
drawFrame();
