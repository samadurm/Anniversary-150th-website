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




    //added by Kevin Dong: add event listener to picture so that it goes to comment page
    var posts = document.getElementsByClassName('drawing-post');
    Array.prototype.forEach.call(posts, function(ele){
        ele.addEventListener('click', function(){
            loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
        });
    });
    var titleName = document.getElementById('title');
    Array.prototype.forEach.call(titleName, function(ele){
        titleName.addEventListener('click', function(){
            loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
        });
    });
}
