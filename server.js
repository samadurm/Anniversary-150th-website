const http = require("http");
const fs = require("fs");

const htmlFolder = fs.readdirSync("./public/html");
const htmlContents = [];
htmlFolder.forEach((file)=>{
    htmlContents.push(fs.readFileSync("./public/html/" + file));
});

const cssFolder = fs.readdirSync("./public/css");
const cssContents = [];
cssFolder.forEach((file)=>{
    cssContents.push(fs.readFileSync("./public/css/" + file));
});

const jsFolder = fs.readdirSync("./public/js");
const jsContents = [];
jsFolder.forEach((file)=>{
    jsContents.push(fs.readFileSync("./public/js/" + file));
});

const resFolder = fs.readdirSync("./public/res");
const resContents = [];
resFolder.forEach((file)=>{
    resContents.push(fs.readFileSync("./public/res/" + file));
});

const portOptions = {
    hostname : 'localhost',
    port : 3000
};

http.createServer(function(req,res){
    
    var fileType;
    var fileName;

    if(req.url == '/'){
        fileType = 'html';
        fileName = 'main-page.html';
    }else{
        fileType = req.url.split(".")[1];
        fileName = req.url.split("/")[1];
    }

    if(fileType == 'html'){
        res.writeHead(200,"html header",{'Content-Type' : 'text/html'});
        for(var i = 0; i < htmlFolder.length; i++){
            if(htmlFolder[i] == fileName){
                res.write(htmlContents[i]);
                console.log('==loaded: ' + htmlFolder[i])
                break;
            }
        }
    }else if(fileType == 'css'){
        res.writeHead(200,"style header",{'Content-Type' : 'text/css'});
        for(var i = 0; i < cssFolder.length; i++){
            if(cssFolder[i] == fileName){
                res.write(cssContents[i]);
                console.log('==loaded: ' + cssFolder[i])
                break;
            }
        }
    }else if(fileType == 'js'){
        res.writeHead(200,"javascript header",{'Content-Type' : 'application/javascript'});
        for(var i = 0; i < jsFolder.length; i++){
            if(jsFolder[i] == fileName){
                res.write(jsContents[i]);
                console.log('==loaded: ' + jsFolder[i])
                break;
            }
        }
    }else if(fileType == 'png'){
        res.writeHead(200,"image header",{'Content-Type' : 'image/png'});
        for(var i = 0; i < resFolder.length; i++){
            if(resFolder[i] == fileName){
                res.write(resContents[i]);
                console.log('==loaded: ' + resFolder[i])
                break;
            }
        }
    }else if(fileType == 'jpg'){
        res.writeHead(200,"image header",{'Content-Type' : 'image/jpg'});
        for(var i = 0; i < resFolder.length; i++){
            if(resFolder[i] == fileName){
                res.write(resContents[i]);
                console.log('==loaded: ' + resFolder[i])
                break;
            }
        }
    }else if(fileType == 'ico'){
        res.writeHead(200,"favicon",{'Content-Type' : 'image/x-icon'});
        res.write(fs.readFileSync('public/favicon.ico'));
        console.log('==loaded: favicon.ico');
    }
    res.end();

}).listen(portOptions,function(err){
    if(err){
        throw err;
    }
});