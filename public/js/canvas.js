    var canvas;
    var canvasOpts;
    var canvasOpacity;
    var canvasDarkness;
    var rgba;
    var rgbaInfo;
    var darkness = 1;
    var ctx;
    var optsCtx;
    var opctCtx;
    var darkCtx;

function init(){
    canvas = document.getElementById("addpost-canvas");
    canvasOpts = document.getElementById("canvas-options");
    canvasOpacity = document.getElementById("opacity-options");
    canvasDarkness = document.getElementById("darkness-options");

    if(canvas.getContext){
        ctx = canvas.getContext('2d');
        ctx.lineWidth = 3;
        rgba = 'rgba(0,0,0,1)';
        rgbaInfo = rgba.substring(5,rgba.length-1).split(',');
        ctx.strokeStyle = rgba;
        ctx.lineJoin = 'round';
    }
    if(canvasOpts.getContext){
        optsCtx = canvasOpts.getContext('2d');
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
            opctCtx.fillStyle = 'rgba('+rgbaInfo[0]+','+rgbaInfo[1]+','+rgbaInfo[2]+','+i/100+')';
            opctCtx.fillRect(0,200-(i*2),15,2);
        }
    }
    if(canvasDarkness.getContext){
        darkCtx = canvasDarkness.getContext('2d');
        for(var i = 100; i > 0; i--){
            darkCtx.fillStyle = 'rgba('+rgbaInfo[0]*i+','+rgbaInfo[1]*i+','+rgbaInfo[2]*i+','+'1'+')';
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
            if(Math.sqrt((event.offsetX-100)*(event.offsetX-100) + (event.offsetY-100)*(event.offsetY-100)) < 95){
                updateColor('color',optsCtx.getImageData(event.offsetX,event.offsetY,1,1).data);
            }
        }
    });

    canvasOpts.addEventListener("mousemove", function(event){
        if(event.buttons == 1){
            var colorData = optsCtx.getImageData(event.offsetX,event.offsetY,1,1).data;
            if(Math.sqrt((event.offsetX-100)*(event.offsetX-100) + (event.offsetY-100)*(event.offsetY-100)) < 95){
                updateColor('color',optsCtx.getImageData(event.offsetX,event.offsetY,1,1).data);
            }
        }
    });
    
    canvasOpacity.addEventListener("mousemove", function(event){
        if(event.buttons == 1){
           var opacity = (200-event.offsetY)/200;
           if(opacity > 1) opacity = 1;
           if(opacity < 0) opacity = 0;
           updateColor('opacity',opacity);
        }
    });

    canvasOpacity.addEventListener("mousedown", function(event){
        if(event.buttons == 1){
           var opacity = (200-event.offsetY)/200;
           if(opacity > 1) opacity = 1;
           if(opacity < 0) opacity = 0;
           updateColor('opacity',opacity);
        }
    });

    canvasDarkness.addEventListener("mousemove", function(event){
        if(event.buttons == 1){
            darkness = (200-event.offsetY)/200;
            if(darkness > 1) darkness = 1;
            if(darkness < 0) darkness = 0;
            updateColor();
        }
    });

    canvasDarkness.addEventListener("mousedown", function(event){
        if(event.buttons == 1){
            darkness = (200-event.offsetY)/200;
            if(darkness > 1) darkness = 1;
            if(darkness < 0) darkness = 0;
            updateColor();
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

    document.getElementById("post-button").addEventListener("click", function(){
        var postInfo = {};
        postInfo.title = document.getElementById('title-post-input').value;
        postInfo.creator = document.getElementById('creator-post-input').value;
        postInfo.data = canvas.toDataURL();
        var postreq = new XMLHttpRequest();
        postreq.onreadystatechange = function(){
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                alert(this.responseText);
            }
            if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
                alert("error occured in saving image");
            }
        };
        postreq.open('POST','image',true);
        postreq.setRequestHeader('Content-Type','application/json');
        postreq.send(JSON.stringify(postInfo));
    });
}

function updateColor(type, value){
    if(type == 'color'){
        rgba = 'rgba(' + value[0] + ',' + value[1] + ',' + value[2] + ',' + rgbaInfo[3] + ')';
        for(var i = 100; i > 0; i--){
            darkCtx.fillStyle = 'rgba('+rgbaInfo[0]*(i/100)+','+rgbaInfo[1]*(i/100)+','+rgbaInfo[2]*(i/100)+','+'1'+')';
            darkCtx.fillRect(0,200-(i*2),15,2);
        }
    }
    if(type == 'opacity'){
        rgba = 'rgba(' + rgbaInfo[0] + ',' + rgbaInfo[1] + ',' + rgbaInfo[2] + ',' + value + ')';
    }
    console.log(rgba);
    rgbaInfo = rgba.substring(5,rgba.length-1).split(',');
    optsCtx.fillStyle = 'rgba(' + rgbaInfo[0]*darkness + ',' + rgbaInfo[1]*darkness + ',' + rgbaInfo[2]*darkness + ',' + rgbaInfo[3] + ')';
    optsCtx.clearRect(10,220,50,50);
    optsCtx.fillRect(10,220,50,50);
    ctx.strokeStyle = 'rgba(' + rgbaInfo[0]*darkness + ',' + rgbaInfo[1]*darkness + ',' + rgbaInfo[2]*darkness + ',' + rgbaInfo[3] + ')';
}