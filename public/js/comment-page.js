function initComment(callback = displayPosts){
    var jsonreq = new XMLHttpRequest();
    jsonreq.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            callback(this.responseText);
        }
        if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
            alert("error occured in loading image json");
        }
    };
    jsonreq.open('GET','image-data.json',true);
    jsonreq.send();

//Close big picture
$(document).click(function (e) {
    var el = e.srcElement || e.target;
    if (el.id == "pic_img") {
        
    }
    else {
		$("#cover").fadeOut();
        $("#modelDiv").fadeOut();
    }
});
}


function displayPosts(jsonInfo){
	
    var imgData = JSON.parse(jsonInfo);
	if(imgData[0].rating){
		$("#good_count").html(imgData[0].rating[0]);
		$("#bad_count").html(imgData[0].rating[1]);
	}
	$("#pic_img").attr('src',imgData[0].data);
	$("#pic_img").attr('data-title',imgData[0].title)
	$("#pic_img").attr('data-creator',imgData[0].creator)
	
	$("#big_pic_img").attr('src',imgData[0].data);
	
	var comments=imgData[0].Comments;
	var commetHtml="";
	$.each(comments,function(index,value){
		commetHtml+=value+"<br/><br/>"
	})		
	$("#TextArea").html(commetHtml);
}


//Additional comments
function comment() {
	var lasttext=$("#TextArea").html();
	var name=$("#commentator").val();
    var txt = $("#txt_pl").val();
    lasttext += name+":"+txt+'<br/><br>';
	
	var comment={"newcomment":name+":"+txt};
	var postreq = new XMLHttpRequest();
	postreq.onreadystatechange = function(){
		if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
			alert(this.responseText);
		}
		if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
			alert("error occured in comment image");
		}
	};
	postreq.open('POST','comment',true);
	postreq.setRequestHeader('Content-Type','application/json');
	postreq.send(JSON.stringify(comment));
	
    $("#TextArea").html(lasttext);
}

//Good or bad evaluation
function Good(check) {
    var srctype = $("#good_img").attr("src");
    if (srctype.indexOf("good.png") > -1) {
        check = false;
		var badCount=$("#bad_count").text();
		var goodCount=$("#good_count").text();
		
		if($("#bad_img").attr('src')=='Images/bad_orang.png'){
			badCount--;
			$("#bad_count").text(badCount);
		}
		$("#good_img").attr("src", "Images/good_orang.png");
        $("#bad_img").attr("src", "Images/bad.png");
		
		goodCount++;
		$("#good_count").text(goodCount);
		
		SendAjax(goodCount,badCount,"error occured in good image");
    }
    else {
        check = true;
        $("#good_img").attr("src", "Images/good.png");

		var badCount=$("#bad_count").text();
		var goodCount=$("#good_count").text();
		goodCount--;
		$("#good_count").text(goodCount);
		
		SendAjax(goodCount,badCount,"error occured in cancel good image");
    }

}

////Good or bad evaluation
function Bad(check) {
    var srctype = $("#bad_img").attr("src");
    if (srctype.indexOf("bad.png") > -1) {
        check = false;
		var goodCount=$("#good_count").text();
		var badCount=$("#bad_count").text();
		
		if($("#good_img").attr('src')=='Images/good_orang.png'){
			goodCount--;
			$("#good_count").text(goodCount);
		}
        $("#bad_img").attr("src", "Images/bad_orang.png");
        $("#good_img").attr("src", "Images/good.png");
		
		badCount++;
		$("#bad_count").text(badCount);
		
		SendAjax(goodCount,badCount,"error occured in bad image");
    }
    else {
        check = true;
        $("#bad_img").attr("src", "Images/bad.png");
		var goodCount=$("#good_count").text();
		var badCount=$("#bad_count").text();
		
		badCount--;
		$("#bad_count").text(badCount);
		
		SendAjax(goodCount,badCount,"error occured in cancel bad image");
    }

}

function SendAjax(goodCount,badCount,message){
	var CommentCount={"goodCount":goodCount,"badCount":badCount};
	var postreq = new XMLHttpRequest();
	postreq.onreadystatechange = function(){
		if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
			alert(this.responseText);
		}
		if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
			alert(message);
		}
	};
	postreq.open('POST','CommentCount',true);
	postreq.setRequestHeader('Content-Type','application/json');
	postreq.send(JSON.stringify(CommentCount));
}

//View larger image
function showBigPic() {
	$("#cover").fadeIn();
    $("#modelDiv").fadeIn();
}
