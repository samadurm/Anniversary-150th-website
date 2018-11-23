const http = require("http");
const fs = require("fs");
const express = require('express');
const bodyparser = require('body-parser');

const htmlFolder = fs.readdirSync("./public/html");
const cssFolder = fs.readdirSync("./public/css");
const jsFolder = fs.readdirSync("./public/js");
const resFolder = fs.readdirSync("./public/res");

const portOptions = {
    hostname : 'localhost',
    port : process.env.PORT || 3000
};

var app = express();
app.use(bodyparser.json());
http.createServer(app);

app.listen(portOptions, function(err){
    if(err){
        throw err;
    }else{
        console.log('==Listening on Port: 3000');
    }
});

app.get('*', function(req,res){

    var fileType;
    var fileName;

    if(req.url == '/'){
        fileType = 'html';
        fileName = 'skeleton.html';
    }else{
        fileType = req.url.split(".")[1];
        fileName = req.url.split("/")[1];
    }

    var fileFound = false;

    if(fileType == 'html'){
        for(var i = 0; i < htmlFolder.length; i++){
            if(htmlFolder[i] == fileName){
                res.status(200).sendFile(__dirname + '/public/html/' + htmlFolder[i]);
                console.log('==loaded: ' + htmlFolder[i]);
                fileFound = true;
                break;
            }
        }
    }else if(fileType == 'css'){
        for(var i = 0; i < cssFolder.length; i++){
            if(cssFolder[i] == fileName){
                res.status(200).sendFile(__dirname + '/public/css/' + cssFolder[i]);
                console.log('==loaded: ' + cssFolder[i]);
                fileFound = true;
                break;
            }
        }
    }else if(fileType == 'js'){
        for(var i = 0; i < jsFolder.length; i++){
            if(jsFolder[i] == fileName){
                res.status(200).sendFile(__dirname + '/public/js/' + jsFolder[i]);
                console.log('==loaded: ' + jsFolder[i]);
                fileFound = true;
                break;
            }
        }
    }else if(fileType == 'png'){
        for(var i = 0; i < resFolder.length; i++){
            if(resFolder[i] == fileName){
                res.status(200).sendFile(__dirname + '/public/res/' + resFolder[i]);
                console.log('==loaded: ' + resFolder[i]);
                fileFound = true;
                break;
            }
        }
    }else if(fileType == 'jpg'){
        for(var i = 0; i < resFolder.length; i++){
            if(resFolder[i] == fileName){
                res.status(200).sendFile(__dirname + '/public/res/' + resFolder[i]);
                console.log('==loaded: ' + resFolder[i]);
                fileFound = true;
                break;
            }
        }
    }else if(fileType == 'ico'){
        res.status(200).sendFile(__dirname + '/public/favicon.ico');
        console.log('==loaded: favicon.ico');
    }
    if(!fileFound){
        res.status(404).sendFile(__dirname + '/public/html/404-page.html');
        console.log('==ERROR 404: FILE NOT FOUND');
    }
});
