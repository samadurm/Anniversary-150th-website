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

}).listen(potOptions,function(err){
    if(err){
        throw err;
    }
});