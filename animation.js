const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let y = 0;
let dX = 5;
let dY = 5;
let xInvert = false;
let yInvert = false;

const player={
    //variables use key:value pair syntax
    x:200,
    y:200,
    color:"Green",
    speed:5
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
        dX = dX * -1;
    }
    if(x<0){
        dX = dX * -1;
    }
    if(y>550){
        dY = dY * -1;
    }
    if(y<0){
        dY = dY * -1;
    }
    //In order to handle an event we need two things:
        //-Event handler, does things because event
        //-Event listener, notices when an event happens and calls the handler

    x = x+dX;
    y = y+dY;

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

//call our function
animate();
