const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let y = 0;
let dX = 5;
let dY = 5;
let xInvert = false;
let yInvert = false;

//define functions
function drawRect(x,y) {
    console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}

function animate() {
    //Inversion Detection and Logic:
    if(x>canvas.width){
        xInvert = true;
        dX = -(dX);
    }
    if(x<0){
        xInvert = false;
        dX = Math.fabs(dX);
    }
    if(y>canvas.height){
        yInvert = true;
        dY = -(dY);
    }
    if(y<0){
        yInvert = false;
        dY = Math.fabs(dY);
    }
    x = x+dX;
    y = y+dY;

    requestAnimationFrame(animate);
}

//call our function
animate();
