const http = require("http");
const fs = require("fs");

const css = fs.readFileSync("./public/style.css");
const html = fs.readFileSync("./public/index.html");
const js = fs.readFileSync("./public/index.js");

const portOptions = {
    hostname : 'localhost',
    port : 3000
};

http.createServer(function(req,res){
    if(req.url == "/"){
        res.writeHead(200,"index.html header",{'Content-Type' : 'text/html'});
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