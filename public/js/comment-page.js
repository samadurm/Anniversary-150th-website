function initComment(callback = displayPosts){
$.getJSON('image-data.json',function(data){
	$("#pic_img").attr('src',data[1].data);
	$("#big_pic_img").attr('src',data[1].data);
})

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

//Additional comments
function comment() {
	var lasttext=$("#TextArea").html();
	var name=$("#commentator").val();
    var txt = $("#txt_pl").val();
	var commenterName="<lable style=\"font-size:20px;\">"+name+":</lable>";
	var commentContent="<p>"+txt+"</p>";
    lasttext += commenterName+commentContent+'<br/>';
	
    $("#TextArea").html(lasttext);
}

//Good or bad evaluation
function Good(check) {
    var srctype = $("#good_img").attr("src");
    if (srctype.indexOf("good.png") > -1) {
        check = false;
		if($("#bad_img").attr('src')=='Images/bad_orang.png'){
			var badCount=$("#bad_count").text();
			badCount--;
			$("#bad_count").text(badCount);
		}
		$("#good_img").attr("src", "Images/good_orang.png");
        $("#bad_img").attr("src", "Images/bad.png");
		
		var goodCount=$("#good_count").text();
		goodCount++;
		$("#good_count").text(goodCount);
		
    }
    else {
        check = true;
        $("#good_img").attr("src", "Images/good.png");

		
		var goodCount=$("#good_count").text();
		goodCount--;
		$("#good_count").text(goodCount);
    }

}

////Good or bad evaluation
function Bad(check) {
    var srctype = $("#bad_img").attr("src");
    if (srctype.indexOf("bad.png") > -1) {
        check = false;
		if($("#good_img").attr('src')=='Images/good_orang.png'){
			var goodCount=$("#good_count").text();
			goodCount--;
			$("#good_count").text(goodCount);
		}
        $("#bad_img").attr("src", "Images/bad_orang.png");
        $("#good_img").attr("src", "Images/good.png");
		
		var badCount=$("#bad_count").text();
		badCount++;
		$("#bad_count").text(badCount);
    }
    else {
        check = true;
        $("#bad_img").attr("src", "Images/bad.png");
       
		var badCount=$("#bad_count").text();
		badCount--;
		$("#bad_count").text(badCount);
    }

}

//View larger image
function showBigPic() {
	$("#cover").fadeIn();
    $("#modelDiv").fadeIn();
}
