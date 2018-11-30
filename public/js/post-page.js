

function initPost(callback = displayPosts){
    var jsonreq = new XMLHttpRequest();
    jsonreq.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            callback(this.responseText);
        }
        if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
            alert("error occured in loading image json");
        }
        // Micah added this
        var likes = 0;
        var dislikes = 0;
        var thumbsUp = document.getElementById('thumbs-up');
        var thumbsDown = document.getElementById('thumbs-down');
        var likeCount = document.getElementById('like-count');
        var dislikeCount = document.getElementById('dislike-count');

        // thumbsUp.on('click', function() {
        //     console.log("thumbsUp is clicked");
        // });
        thumbsUp.addEventListener('click', function(event){
            likes++;
            likeCount.innerHTML = likes;
            // thumbsUp.off('click');
        });
        thumbsDown.addEventListener('click', function(event){
            dislikes++;
            dislikeCount.innerHTML = dislikes;
        });
    };
    
    jsonreq.open('GET','image-data.json',true);
    jsonreq.send();
}

function displayPosts(jsonInfo){
    var imgData = JSON.parse(jsonInfo);
    imgData.forEach(element => {
        var image = document.createElement('img');
        image.src = element.data;
        document.getElementById('main-div').appendChild(image);
    });
}
// function comment() {
// 	var lasttext=$("#TextArea").html();
// 	var name=$("#commentator").val();
//     var txt = $("#txt_pl").val();
// 	var commenterName="<lable style=\"font-size:20px;\">"+name+":</lable>";
// 	var commentContent="<p>"+txt+"</p>";
//     lasttext += commenterName+commentContent+'<br/>';
	
//     $("#TextArea").html(lasttext);
// }

// //Good or bad evaluation
// function Good(check) {
//     var srctype = $("#good_img").attr("src");
//     if (srctype.indexOf("good.png") > -1) {
//         check = false;
// 		if($("#bad_img").attr('src')=='Images/bad_orang.png'){
// 			var badCount=$("#bad_count").text();
// 			badCount--;
// 			$("#bad_count").text(badCount);
// 		}
// 		$("#good_img").attr("src", "Images/good_orang.png");
//         $("#bad_img").attr("src", "Images/bad.png");
		
// 		var goodCount=$("#good_count").text();
// 		goodCount++;
// 		$("#good_count").text(goodCount);
		
//     }
//     else {
//         check = true;
//         $("#good_img").attr("src", "Images/good.png");

		
// 		var goodCount=$("#good_count").text();
// 		goodCount--;
// 		$("#good_count").text(goodCount);
//     }

// }

// ////Good or bad evaluation
// function Bad(check) {
//     var srctype = $("#bad_img").attr("src");
//     if (srctype.indexOf("bad.png") > -1) {
//         check = false;
// 		if($("#good_img").attr('src')=='Images/good_orang.png'){
// 			var goodCount=$("#good_count").text();
// 			goodCount--;
// 			$("#good_count").text(goodCount);
// 		}
//         $("#bad_img").attr("src", "Images/bad_orang.png");
//         $("#good_img").attr("src", "Images/good.png");
		
// 		var badCount=$("#bad_count").text();
// 		badCount++;
// 		$("#bad_count").text(badCount);
//     }
//     else {
//         check = true;
//         $("#bad_img").attr("src", "Images/bad.png");
       
// 		var badCount=$("#bad_count").text();
// 		badCount--;
// 		$("#bad_count").text(badCount);
//     }

// }

