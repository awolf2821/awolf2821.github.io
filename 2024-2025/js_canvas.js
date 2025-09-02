const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawCircle(centerx, centery, radius, fillColor){
    ctx.fillStyle(fillColor)
    ctx.beginPath();
    ctx.arc(centerx, centery, radius, 0, 2*Math.PI);
    ctx.fill()
    console.log("Drew Circle");
}

function drawTriangle(point1x, point2x, point3x, point1y, point2y, point3y, fillColor){
    ctx.fillStyle = (fillColor);
    ctx.beginpath();
    ctx.moveTo(point1x, point1y);
    ctx.lineTo(point2x, point2y);
    ctx.lineTo(point3x, point3y);
    ctx.lineTo(point1x, point1y);
    ctx.closePath();
    ctx.fill();
    console.log("Drew Triangle")

}

drawCircle(200, 200, 50, #0000FF);
drawTriangle(20,20, 40, 20, 30, 40,rgb(225, 255, 0));
