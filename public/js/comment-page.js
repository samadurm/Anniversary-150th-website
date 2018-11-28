
function initComment(){
//Additional comments
var lasttext="";
function comment() {
    var txt = $("#txt_pl").val();
    lasttext += txt+'<br/>';
    $("#TextArea").html(lasttext);
   
}

//Good or bad evaluation
function Good(check) {
    var srctype = $("#good_img").attr("src");
    if (srctype.indexOf("good.png") > -1) {
        check = false;
        $("#good_img").attr("src", "Images/good_orang.png");
      
        $("#bad_img").attr("src", "Images/bad.png");
    }
    else {
        check = true;
        $("#good_img").attr("src", "Images/good.png");
      
    }

}

////Good or bad evaluation
function Bad(check) {
    var srctype = $("#bad_img").attr("src");
    if (srctype.indexOf("bad.png") > -1) {
        check = false;
        $("#bad_img").attr("src", "Images/bad_orang.png");
      
        $("#good_img").attr("src", "Images/good.png");
    }
    else {
        check = true;
        $("#bad_img").attr("src", "Images/bad.png");
       
    }

}

//View larger image
function showBigPic() {
    $("#modelDiv").fadeIn();

}

//Close big picture
$(document).click(function (e) {
    var el = e.srcElement || e.target;
    if (el.id == "pic_img") {
        
    }
    else {
        $("#modelDiv").fadeOut();
      
    }

});

}