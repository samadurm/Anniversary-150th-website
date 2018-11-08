const http = require("http");
const fs = require("fs");

var htmlFolder = fs.readdirSync("./public/html");
var htmlContents = [];
htmlFolder.forEach((file)=>{
    htmlContents.push(fs.readFileSync("./public/html/" + file));
});

var cssFolder = fs.readdirSync("./public/css");
var cssContents = [];
cssFolder.forEach((file)=>{
    cssContents.push(fs.readFileSync("./public/css/" + file));
});

var jsFolder = fs.readdirSync("./public/js");
var jsContents = [];
jsFolder.forEach((file)=>{
    jsContents.push(fs.readFileSync("./public/js/" + file));
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
    }
    res.end();

}).listen(portOptions,function(err){
    if(err){
        throw err;
    }
});