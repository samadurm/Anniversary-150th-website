const fs = require("fs");

const express = require('express');
const bodyparser = require('body-parser');
const exphbrs = require('express-handlebars');

const cssFolder = fs.readdirSync("./public/css");
const jsFolder = fs.readdirSync("./public/js");
const resFolder = fs.readdirSync("./public/res");

const portOptions = {
    hostname : 'localhost',
    port : process.env.PORT || 3000
};

var app = express();
app.use(bodyparser.json({'limit' : '10mb'}));

app.engine('handlebars', exphbrs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('*', function(req,res){

    var fileType;
    var fileName;
    var renderName;

    if(req.url == '/'){
        fileType = 'html';
        fileName = 'skeleton.html';
        renderName = 'skeleton';
    }else{
		var typeArray=req.url.split(".");
		var nameArray=req.url.split("/")
        fileType = typeArray[typeArray.length-1];
        fileName = nameArray[nameArray.length-1];
        renderName = fileName.split('.')[0];
    }
	
    var fileLoaded = false;
    if(fileType == 'html'){
        var postData = fs.readFileSync('./public/image-data.json');
        var posts = JSON.parse(postData);
        res.status(200).render(renderName,{posts : posts});
        console.log('==loaded: ' + fileName);
        fileLoaded = true;
    }else if(fileType == 'css'){
        for(var i = 0; i < cssFolder.length; i++){
            if(cssFolder[i] == fileName){
                res.status(200).sendFile(__dirname + '/public/css/' + cssFolder[i]);
                console.log('==loaded: ' + cssFolder[i]);
                fileLoaded = true;
                break;
            }
        }
    }else if(fileType == 'js'){
        for(var i = 0; i < jsFolder.length; i++){
            if(jsFolder[i] == fileName){
                res.status(200).sendFile(__dirname + '/public/js/' + jsFolder[i]);
                console.log('==loaded: ' + jsFolder[i]);
                fileLoaded = true;
                break;
            }
        }
    }else if(fileType == 'png' || fileType == 'PNG'){
        for(var i = 0; i < resFolder.length; i++){
            if(resFolder[i] == fileName){
                res.status(200).sendFile(__dirname + '/public/res/' + resFolder[i]);
                console.log('==loaded: ' + resFolder[i]);
                fileLoaded = true;
                break;
            }
        }
    }else if(fileType == 'jpg' || fileType == 'JPG'||fileType == 'jpg'){
        for(var i = 0; i < resFolder.length; i++){
            if(resFolder[i] == fileName){
                res.status(200).sendFile(__dirname + '/public/res/' + resFolder[i]);
                console.log('==loaded: ' + resFolder[i]);
                fileLoaded = true;
                break;
            }
        }
    }else if(fileType == 'ico'){
        res.status(200).sendFile(__dirname + '/public/favicon.ico');
        console.log('==loaded: favicon.ico');
        fileLoaded = true;
    }else if(fileType == 'json'){
        res.status(200).sendFile(__dirname + '/public/image-data.json');
        console.log('==loaded: image-data.json');
        fileLoaded = true;
    }

    if(!fileLoaded){
        res.status(404).render('404');
        console.log("==ERROR: FILE NOT FOUND: ");
        console.log("   ==FILE TYPE: ",fileType);
        console.log("   ==FILE NAME: ", fileName);
    }
});

app.post('*',function(req,res){
    if(req.url == '/image'){
        fs.readFile(__dirname + '/public/image-data.json','utf8',function(err,raw){
            if(err){
                throw err;
            }
            var data = JSON.parse(raw);
            data.push(req.body);
            var json = JSON.stringify(data,null,4);
            fs.writeFile(__dirname + '/public/image-data.json',json,function(){
                res.status(200).send("Image saved successfully");
            });
        });
    }
	else if(req.url == '/comment'){
        fs.readFile(__dirname + '/public/image-data.json','utf8',function(err,raw){
            if(err){
                throw err;
            }
            var data = JSON.parse(raw);
			if(data[0].Comments){
				data[0].Comments.push(req.body.newcomment);
			}
			else{
				data[0].Comments=[];
				data[0].Comments.push(req.body.newcomment);
			}
			
            var json = JSON.stringify(data,null,4);
            fs.writeFile(__dirname + '/public/image-data.json',json,function(){
                res.status(200).send("Image comment successfully");
            });
        });
    }
	else if(req.url == '/CommentCount'){
        fs.readFile(__dirname + '/public/image-data.json','utf8',function(err,raw){
            if(err){
                throw err;
            }
            var data = JSON.parse(raw);
			console.log('参数为：'+req.body.goodCount+req.body.badCount)
			if(data[0].rating){
				data[0].rating[0]=req.body.goodCount;
				data[0].rating[1]=req.body.badCount;
			}
			else{
				data[0].rating=[];
				data[0].rating[0]=req.body.goodCount;
				data[0].rating[1]=req.body.badCount;
			}
			
			
            var json = JSON.stringify(data,null,4);
            fs.writeFile(__dirname + '/public/image-data.json',json,function(){
                res.status(200).send("Image good or bad successfully");
            });
        });
    }
});


app.listen(portOptions, function(err){
    if(err){
        throw err;
    }else{
        console.log('==Listening on Port:' + portOptions.port);
    }
});
