const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

function drawBackground(){
    let x = 0;
    let y = 0;
    let inverted = 1;
    //Draw repeating rows of said columns
    for(let h = 0; h < 32; h++){
        //Draw repeating columns of alternating color squares
        for(let w = 0; w < 32; w++){
            if(inverted = 1){
                ctx.fillStyle = "#1d991f";
                ctx.fillRect(x,y,x+20,y+20);
                ctx.fill();
                x = x+20;
                ctx.fillStyle = "#29c22b";
                ctx.fillRect(x,y,x+20,y+20);
                ctx.fill();
                x = x+20;
                inverted = inverted * -1;
            }
            if(inverted = -1){
                ctx.fillStyle = "#29c22b";
                ctx.fillRect(x,y,x+20,y+20);
                ctx.fill();
                x = x+20;
                ctx.fillStyle = "#1d991f";
                ctx.fillRect(x,y,x+20,y+20);
                ctx.fill();
                x = x+20;
                inverted = inverted * -1;
            }
        }
        y = y+20;
    }
}
