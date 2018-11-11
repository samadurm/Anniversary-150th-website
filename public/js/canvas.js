var canvas;
var ctx;

function initCanvas(){
    canvas = document.getElementById("addpost-canvas");
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgb(10,10,200)';
        ctx.lineJoin = 'round';
    }
    var drawing = false;
    canvas.addEventListener("mousemove", function(event){
        if(event.buttons == 1){
            if(drawing){
                ctx.lineTo(event.offsetX,event.offsetY);
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(event.offsetX,event.offsetY);
            }else{
                ctx.beginPath();
                ctx.moveTo(event.offsetX,event.offsetY);
                drawing = true;
            }
        }else{
            drawing = false;
        }
    });

    canvas.addEventListener("mouseleave", function(){
        drawing = false;
    });
}

function updateContext(){
    
}