function initPost(){
        // Micah added this

        var likes = 0;
        var dislikes = 0;
        var thumbsUp = document.getElementById('thumbs-up');
        var thumbsDown = document.getElementById('thumbs-down');
        var likeCount = document.getElementById('like-count');
        var dislikeCount = document.getElementById('dislike-count');
        var postContainer = document.getElementById('post-container')

        var upClick = false;
        function handleThumbsUpClick(){
            if(upClick === false){
                likes++;
                likeCount.innerHTML = likes;
                upClick = true;
                thumbsUp.classList.toggle('highlight');
            }
            else{
                upClick = false;
                likes--;
                likeCount.innerHTML = likes;
                thumbsUp.classList.toggle('highlight');
            }
        }
        thumbsUp.addEventListener('click', function(event){
            if(downClick === false) {
                handleThumbsUpClick();
            }
            else{
                handleThumbsDownClick();
                handleThumbsUpClick();
            }
        });
        var downClick = false;
        function handleThumbsDownClick() {
            if(downClick === false){
                dislikes++;
                dislikeCount.innerHTML = dislikes;
                downClick = true;
                thumbsDown.classList.toggle('highlight');
            }
            else {
                downClick = false;
                dislikes--;
                dislikeCount.innerHTML = dislikes;
                thumbsDown.classList.toggle('highlight');
            }
        }
        thumbsDown.addEventListener('click', function(event){
            if(upClick === false) {
                handleThumbsDownClick();
            }
            else{
                handleThumbsUpClick();
                handleThumbsDownClick();
            }
        });
        postContainer.addEventListener('click', function(event){
            postContainer.classList.toggle('enlargePhoto');
        });
        // var xmlhttp = new XMLHttpRequest();

        // xmlhttp.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         alert("loaded image json");
        //         xmlReq.open('GET','image-data.json',true);
        //         xmlReq.send();
                
        //         // document.getElementById("demo").innerHTML = myArr[0];
        //     }
        //     else{
        //         alert("error occured in loading image json");
        //     }
    
        // };

        // var xmlReq = new XMLHttpRequest();
        // xmlReq.onreadystatechange = function() {}
        // if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        //     console.log("this loaded successfully");
        //     var imageData = JSON.parse(this.responseText);
        //     document.getElementsByClassName('likes').innerHTML = imageData.goodRating;
        //     console.log("image goodRAting is " + imageData.goodRating);
        //     document.getElementsByClassName('dislikes').innerHTML = imageData.badRating;
        //     console.log("image badRating is " + imageData.badRating);
           
        // }
        // else if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
        //     else{
        //     alert("error occured in loading image json");
        // }

        // function addEventListenersThumbs() {
        //     var thumbsUp = document.getElementsByClassName('thumbs-up-class');
        //     var thumbsDown = document.getElementsByClassName('thumbs-down-class');
        //     thumbsUp.addEventListener('click', function(){
        //         imageData.goodRating += 1;
        //     });
        //     thumbsDown.addEventListener('click', function(){
        //         imageData.badRating += 1;
        //     });
        // }
    
    // xmlReq.open('GET','image-data.json',true);
    // xmlReq.send();
    // addEventListenersThumbs();
    addEventListenersPost();
}



function addEventListenersPost(){
    var posts = document.getElementsByClassName('drawing-post');
    Array.prototype.forEach.call(posts, function(ele){
        ele.addEventListener('click', function(){
            loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
        });
    });
    var titleName = document.getElementsByClassName('title');
    Array.prototype.forEach.call(titleName, function(ele){
        ele.addEventListener('click', function(){
            loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
        });
    });
    var authorName = document.getElementsByClassName('author');
    Array.prototype.forEach.call(authorName, function(ele){
        ele.addEventListener('click', function(){
            loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
        });
    });
}
