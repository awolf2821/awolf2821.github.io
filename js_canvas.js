const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawCircle(centerx, centery, radius, fillColor){
    ctx.fillStyle(fillColor)
    ctx.beginPath();
    ctx.arc(centerx, centery, radius, 0, 2*Math.PI);
    ctx.fill()
    console.log("Drew Circle");
}

drawCircle(200, 200, 50, #0000FF);