function initPost(){
        var thumbsUp = document.getElementsByClassName('thumbs-up');
        var thumbsDown = document.getElementsByClassName('thumbs-down');
        var likeCount = document.getElementsByClassName('like-count');
        var dislikeCount = document.getElementsByClassName('dislike-count');
        var likes = likeCount.innerHTML;
        var dislikes = dislikeCount.innerHTML;
        var postContainer = document.getElementsByClassName('post-container');

        Array.prototype.forEach.call(postContainer, function(ele){

        });

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
        addEventListenersPost();
}

// function addEventListenersPost(){
//     var posts = document.getElementsByClassName('drawing-post');
//     Array.prototype.forEach.call(posts, function(ele){
//         ele.addEventListener('click', function(){
//             loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
//         });
//     });
//     var titleName = document.getElementsByClassName('title');
//     Array.prototype.forEach.call(titleName, function(ele){
//         ele.addEventListener('click', function(){
//             loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
//         });
//     });
//     var authorName = document.getElementsByClassName('author');
//     Array.prototype.forEach.call(authorName, function(ele){
//         ele.addEventListener('click', function(){
//             loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
//         });
//     });
// }

function addEventListenersPost(){
    var postContainer = document.getElementsByClassName('post-container');

    Array.prototype.forEach.call(postContainer, function(ele){
        var creator = ele.getElementById('author-name-container');
        var title = ele.getElementById('title');
        var image = ele.getElementById('drawing-container');
        creator.addEventListener('click',function(){
            loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
        });
        title.addEventListener('click',function(){
            loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
        });
        image.addEventListener('click',function(){
            loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
        });
    });
}