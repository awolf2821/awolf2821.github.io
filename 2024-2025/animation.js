const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

const box ={
    x:0,
    y:0,
    dX:5,
    dY:5
}

const player={
    //variables use key:value pair syntax
    x:200,
    y:200,
    color:"Green",
    speed:5
}

const game={
    frames:0,
    score:0,
    gamerunning:true
}

//Keylogger
//To add to keys, we use syntax keys['ArrowUp'], true
const keys={
}

//define functions
function drawRect(x,y) {
    //console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}

function collisionCheck(){
    let player_min_x = player.x-20;
    let player_min_y = player.y-20;
    let player_max_x = player.x+20;
    let player_max_y = player.y+20;

    let box_min_x = box.x-50;
    let box_min_y = box.y-50;
    let box_max_x = box.x+50;
    let box_max_y = box.y+50;

    if(box_max_y > player_min_y &&
        box_min_y < player_max_y &&
        box_max_x > player_min_x &&
        box_min_x < player_max_x
    ){
        game.gamerunning = false;
    }
}

function drawPlayer(){
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y,
        20,
        0, 
        2 * Math.PI);
        ctx.fill();
}

function movePlayer(){
    
    if(keys['ArrowDown']){
        player.y += player.speed;
    }
    if(keys['ArrowUp']){
        player.y -= player.speed;
    }
    if(keys['ArrowLeft']){
        player.x -= player.speed;
    }
    if(keys['ArrowRight']){
        player.x += player.speed;
    }

    if(player.x > 780){
        player.x = 780;
    }
    if(player.x < 20){
        player.x = 20;
    }
    if(player.y > 580){
        player.y = 580;
    }
    if(player.y < 20){
        player.y = 20;
    }
}

function animate() {
    //Inversion Detection and Logic:
    if(x>750){
        box.dX = box.dX * -1;
    }
    if(x<0){
        box.dX = box.dX * -1;
    }
    if(y>550){
        box.dY = box.dY * -1;
    }
    if(y<0){
        box.dY = box.dY * -1;
    }
    //In order to handle an event we need two things:
        //-Event handler, does things because event
        //-Event listener, notices when an event happens and calls the handler

    box.x = box.x+box.dX;
    box.y = box.y+box.dY;

    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    requestAnimationFrame(animate);
    drawRect(x,y);
    movePlayer();
    drawPlayer();

}
animate();

