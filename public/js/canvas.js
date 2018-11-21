function init(){
    var canvas;
    var canvasOpts;
    var canvasOpacity;
    var canvasDarkness;
    var rgba;
    var ctx;
    var optsCtx;
    var opctCtx;
    var darkCtx;

    canvas = document.getElementById("addpost-canvas");
    canvasOpts = document.getElementById("canvas-options");
    canvasOpacity = document.getElementById("opacity-options");
    canvasDarkness = document.getElementById("darkness-options");

    if(canvas.getContext){
        ctx = canvas.getContext('2d');
        ctx.lineWidth = 3;
        rgba = 'rgba(0,0,0,1)';
        ctx.strokeStyle = rgba;
        ctx.lineJoin = 'round';
    }
    if(canvasOpts.getContext){
        optsCtx = canvasOpts.getContext('2d');
        optsCtx.imageSmoothingEnabled = true;
        var img = new Image;
        img.src = 'color-wheel.jpg';
        img.onload = function(){
            optsCtx.drawImage(img,0,0,1300,1300,0,0,200,200);
        };
        optsCtx.fillStyle = rgba;
        optsCtx.fillRect(10,220,50,50);
    }
    if(canvasOpacity.getContext){
        opctCtx = canvasOpacity.getContext('2d');
        for(var i = 100; i > 0; i--){
            var opctInfo = rgba.substring(5,rgba.length-1).split(',');
            var opctRGBA = 'rgba('+opctInfo[0]+','+opctInfo[1]+','+opctInfo[2]+','+i/100+')';
            opctCtx.fillStyle = opctRGBA;
            opctCtx.fillRect(0,200-(i*2),15,2);
        }
    }
    if(canvasDarkness.getContext){
        darkCtx = canvasDarkness.getContext('2d');
        for(var i = 100; i > 0; i--){
            var darkInfo = rgba.substring(5,rgba.length-1).split(',');
            var darkRGBA = 'rgba('+darkInfo[0]*i+','+darkInfo[1]*i+','+darkInfo[2]*i+','+'1'+')';
            console.log(darkRGBA);
            darkCtx.fillStyle = darkRGBA;
            darkCtx.fillRect(0,200-(i*2),15,2);
        }
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
            if(Math.sqrt((event.offsetX-100)*(event.offsetX-100) + (event.offsetY-100)*(event.offsetY-100)) < 95){
                rgba = 'rgba(' + colorData[0] + ',' + colorData[1] + ',' + colorData[2] + ',1)';
            }
            optsCtx.fillStyle = rgba;
            optsCtx.fillRect(10,220,50,50);
            ctx.strokeStyle = rgba;
            for(var i = 100; i > 0; i--){
                var darkInfo = rgba.substring(5,rgba.length-1).split(',');
                var darkRGBA = 'rgba('+darkInfo[0]*(i/100)+','+darkInfo[1]*(i/100)+','+darkInfo[2]*(i/100)+','+'1'+')';
                console.log(darkRGBA);
                darkCtx.fillStyle = darkRGBA;
                darkCtx.fillRect(0,200-(i*2),15,2);
            }
        }
    });

    canvasOpts.addEventListener("mousemove", function(event){
        if(event.buttons == 1){
            var colorData = optsCtx.getImageData(event.offsetX,event.offsetY,1,1).data;
            if(Math.sqrt((event.offsetX-100)*(event.offsetX-100) + (event.offsetY-100)*(event.offsetY-100)) < 95){
                rgba = 'rgba(' + colorData[0] + ',' + colorData[1] + ',' + colorData[2] + ',1)';
            }
            optsCtx.fillStyle = rgba;
            optsCtx.fillRect(10,220,50,50);
            ctx.strokeStyle = rgba;
            for(var i = 100; i > 0; i--){
                var darkInfo = rgba.substring(5,rgba.length-1).split(',');
                var darkRGBA = 'rgba('+darkInfo[0]*(i/100)+','+darkInfo[1]*(i/100)+','+darkInfo[2]*(i/100)+','+'1'+')';
                console.log(darkRGBA);
                darkCtx.fillStyle = darkRGBA;
                darkCtx.fillRect(0,200-(i*2),15,2);
            }
        }
    });
    
    document.getElementById("linewidth-range").oninput = function(){
        document.getElementById("linewidth-value").value = this.value;
        ctx.lineWidth = this.value;
    };

    document.getElementById("linewidth-value").oninput = function(){
        if(this.value > 20) this.value = 20;
        if(this.value < 1) this.value = 1;
        ctx.lineWidth = this.value;
        document.getElementById("linewidth-range").value = this.value;
    };
    
    document.getElementById("pen-button").addEventListener("click", function(){
        ctx.strokeStyle = rgba;
    });

    document.getElementById("eraser-button").addEventListener("click", function(){
        ctx.strokeStyle = 'rgba(255,255,255,1)';
    });
    
    document.getElementById("reset-button").addEventListener("click", function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    });
    
}
