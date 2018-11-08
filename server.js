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

http
.createServer(function(req,res){

    if(req.url == "/"){
        res.writeHead(200,"base html header",{'Content-Type' : 'text/html'});
        var fileIndex;
        htmlFolder.forEach((file)=>{

        });
        res.write(html);
    }else if(req.url == "/style.css"){
        res.writeHead(200,"style header",{'Content-Type' : 'text/css'});
        res.write(css);
    }else if(req.url == "/index.js"){
        res.writeHead(200,"javascript header",{'Content-Type' : 'application/javascript'});
        res.write(js);
    }
    res.end();

}).listen(portOptions,function(err){
    if(err){
        throw err;
    }
});