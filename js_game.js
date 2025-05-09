const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

let snake = {
    length:1,
    headX:2,
    headY:16,
    currentHeading:"east",
}
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
function drawSnake(headX, headY, length){
    //Draw Head
    ctx.fillStyle = "#0390fc";
    ctx.fillRect(headX * 20, headY * 20, 20, 20);
    ctx.fill();
    //Draw Tail
    let direction = snake.currentHeading;
    let penX = headX;
    let penY = headY;
    let changesDirection = false;
    for(let l=0; l<length; l++){
        //Check to see if snake changes direction and adjust values
        changesDirection = checkTurnPoints(penX, penY);
        if(changesDirection){
            let penDirection = readTurnPoints(penX, penY);
        }

        if(penDirection = "north"){
            penY -=1;
        }
        if(penDirection = "south"){
            penY += 1;
        }
        if(direction = "east"){
            penX -= 1;
        }
        if(direction = "west"){
            penX += 1;
        }
        //Draw Body
        ctx.fillStyle = "#0390fc";
        ctx.fillRect(penX * 20, penY * 20, 20, 20);
        ctx.fill();

    }
}
drawBackground();

drawSnake(16,16,1);
