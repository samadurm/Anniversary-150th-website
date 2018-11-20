function initCanvas(){
    var canvas;
    var canvasOpts;
    var rgb;
    var ctx;
    var optsCtx;

    canvas = document.getElementById("addpost-canvas");
    canvasOpts = document.getElementById("canvas-options");
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
        ctx.lineWidth = 3;
        rgb = 'rgb(0,0,0)';
        ctx.strokeStyle = rgb;
        ctx.lineJoin = 'round';
    }
    if(canvasOpts){
        optsCtx = canvasOpts.getContext('2d');
        optsCtx.imageSmoothingEnabled = true;
        var img = new Image;
        img.src = 'color-wheel.jpg';
        img.onload = function(){
            //optsCtx.drawImage(img,0,0,800,670,0,0,400,258);
            optsCtx.drawImage(img,0,0,1300,1300,0,0,600,600);
        };
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
    
    canvasOpts.addEventListener("mousedown", function(event){
        if(event.buttons == 1){
            var colorData = optsCtx.getImageData(event.offsetX,event.offsetY,1,1).data;
            if(Math.sqrt((event.offsetX-300)*(event.offsetX-300) + (event.offsetY-300)*(event.offsetY-300)) < 295){
                rgb = 'rgb(' + colorData[0] + ',' + colorData[1] + ',' + colorData[2] + ')';
            }
            console.log(rgb);
            ctx.strokeStyle = rgb;
        }
    });

    canvasOpts.addEventListener("mousemove", function(event){
        if(event.buttons == 1){
            var colorData = optsCtx.getImageData(event.offsetX,event.offsetY,1,1).data;
            if(Math.sqrt((event.offsetX-300)*(event.offsetX-300) + (event.offsetY-300)*(event.offsetY-300)) < 295){
                rgb = 'rgb(' + colorData[0] + ',' + colorData[1] + ',' + colorData[2] + ')';
            }
            console.log(rgb);
            ctx.strokeStyle = rgb;
        }
    });
    
    document.getElementById("linewidth-range").oninput = function(){
        lineWidth = this.value;
        ctx.lineWidth = this.value;
    };
    
    document.getElementById("pen-button").addEventListener("click", function(){
        ctx.strokeStyle = rgb;
    });

    document.getElementById("eraser-button").addEventListener("click", function(){
        ctx.strokeStyle = 'rgb(255,255,255)';
    });
    
    
}
