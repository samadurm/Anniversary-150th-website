    var canvas;
    var canvasPre;
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
    var preCtx;
    var drawMode;

function initAddpost(){
    canvas = document.getElementById("addpost-canvas");
    canvasPre = document.getElementById("preview-canvas");
    drawMode = 'pen';
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
    if(canvasPre.getContext){
        preCtx = canvasPre.getContext('2d');
        preCtx.lineWidth = ctx.lineWidth;
        preCtx.strokeStyle = ctx.strokeStyle;
        preCtx.lineJoin = 'miter';
    }

    var drawing = false;
    var drawingShape = false;
    var shapeCoordsStart = [];
    var shapeCoordsEnd = [];
    canvas.addEventListener("mousemove", function(event){
        if(event.buttons == 1){
            if(drawMode == 'pen'){
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
                if(drawingShape){
                    var tmpCoords = [event.offsetX,event.offsetY];
                    var x = shapeCoordsStart[0];
                    if(shapeCoordsStart[0] > tmpCoords[0]){
                        x = tmpCoords[0];
                    }
                    var y = shapeCoordsStart[1];
                    if(shapeCoordsStart[1] > tmpCoords[1]){
                        y = tmpCoords[1];
                    }
                    var width = Math.abs(shapeCoordsStart[0] - tmpCoords[0]);
                    var height = Math.abs(shapeCoordsStart[1] - tmpCoords[1]);
                    preCtx.lineWidth = ctx.lineWidth;
                    preCtx.strokeStyle = ctx.strokeStyle;
                    if(drawMode == 'rect'){
                        preCtx.beginPath();
                        preCtx.clearRect(0,0,canvasPre.width,canvasPre.height);
                        preCtx.rect(x,y,width,height);
                        preCtx.stroke();
                        preCtx.closePath();
                    }else if(drawMode == 'circle'){
                        preCtx.beginPath();
                        preCtx.clearRect(0,0,canvasPre.width,canvasPre.height);
                        preCtx.ellipse(x+width/2,y+height/2,width/2,height/2,0,0,Math.PI*2);
                        preCtx.stroke();
                        preCtx.closePath();
                    }
                }
            }
        }else{
            drawing = false;
        }
    });
    
    canvas.addEventListener("mouseleave", function(){
        drawing = false;
        drawingShape = false;
        preCtx.clearRect(0,0,canvasPre.width,canvasPre.height);
    });
    
    canvas.addEventListener("mousedown", function(event){
        if(!drawingShape && (drawMode == 'circle'||drawMode == 'rect')){
            shapeCoordsStart = [event.offsetX,event.offsetY];
            drawingShape = true;
        }
    });

    canvas.addEventListener("mouseup", function(event){
        if(drawingShape == true){
            shapeCoordsEnd = [event.offsetX,event.offsetY];
            var x = shapeCoordsStart[0];
            if(shapeCoordsStart[0] > shapeCoordsEnd[0]){
                x = shapeCoordsEnd[0];
            }
            var y = shapeCoordsStart[1];
            if(shapeCoordsStart[1] > shapeCoordsEnd[1]){
                y = shapeCoordsEnd[1];
            }
            var width = Math.abs(shapeCoordsStart[0] - shapeCoordsEnd[0]);
            var height = Math.abs(shapeCoordsStart[1] - shapeCoordsEnd[1]);
            if(drawMode == 'rect'){
                ctx.beginPath();
                ctx.rect(x,y,width,height);
                ctx.stroke();
                ctx.closePath();
            }else if(drawMode == 'circle'){
                ctx.beginPath();
                ctx.ellipse(x+width/2,y+height/2,width/2,height/2,0,0,Math.PI*2);
                ctx.stroke();
                ctx.closePath();
            }
            drawingShape = false;
        }
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
        drawMode = 'pen';
        ctx.strokeStyle = rgba;
        ctx.lineJoin = 'round';
    });

    document.getElementById("eraser-button").addEventListener("click", function(){
        drawMode = 'pen';
        ctx.strokeStyle = 'rgba(255,255,255,1)';
        ctx.lineJoin = 'round';
    });
    
    document.getElementById("reset-button").addEventListener("click", function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }); 

    document.getElementById("circle-button").addEventListener("click", function(){
        drawMode = 'circle';
        ctx.strokeStyle = rgba;
        ctx.lineJoin = 'miter';
    });

    document.getElementById("square-button").addEventListener("click", function(){
        drawMode = 'rect';
        ctx.strokeStyle = rgba;
        ctx.lineJoin = 'miter';
    });

    document.getElementById("post-image-button").addEventListener("click", function(){
        var titleEmpty = (document.getElementById('title-post-input').value == "");
        var creatorEmpty = (document.getElementById('creator-post-input').value == "");
        var canvasEmpty = canvas.toDataURL() == canvasPre.toDataURL();
        if(titleEmpty){
            alert('Title is empty');
        }else if(creatorEmpty){
            alert('Name is empty');
        }else if(canvasEmpty){
            alert('Canvas is empty');
        }else{
            var postInfo = {};
            postInfo.title = document.getElementById('title-post-input').value;
            postInfo.creator = document.getElementById('creator-post-input').value;
            postInfo.comments = [];
            postInfo.rating = [0,0];
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
        }
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
    rgbaInfo = rgba.substring(5,rgba.length-1).split(',');
    optsCtx.fillStyle = 'rgba(' + rgbaInfo[0]*darkness + ',' + rgbaInfo[1]*darkness + ',' + rgbaInfo[2]*darkness + ',' + rgbaInfo[3] + ')';
    optsCtx.clearRect(10,220,50,50);
    optsCtx.fillRect(10,220,50,50);
    ctx.strokeStyle = 'rgba(' + rgbaInfo[0]*darkness + ',' + rgbaInfo[1]*darkness + ',' + rgbaInfo[2]*darkness + ',' + rgbaInfo[3] + ')';
}