

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
        var upClick = false;
        thumbsUp.addEventListener('click', function(event){
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
                upClick = false;
                handleThumbsDownClick();
            }
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


