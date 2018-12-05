function initPost(){
    addEventListenersPost();
}

function handleThumbsClick(countUp,thumbsUp,countDown,thumbsDown,type){
    var likeInt = parseInt(countUp.innerHTML);;
    var dislikeInt = parseInt(countDown.innerHTML);;
    if(type == 'up'){
        if(thumbsUp.getAttribute("selected") == 'false'){
            countUp.innerHTML = likeInt+1;
            thumbsUp.setAttribute("selected",'true');
            if(thumbsDown.getAttribute('selected')=='true'){
                thumbsDown.setAttribute('selected','false');
                countDown.innerHTML = dislikeInt - 1;
                thumbsDown.classList.toggle('highlight');
            }
            thumbsUp.classList.toggle('highlight');
        }
        else{
            thumbsUp.setAttribute("selected",'false');
            countUp.innerHTML = likeInt-1;
            thumbsUp.classList.toggle('highlight');
        }
    }else{
        if(thumbsDown.getAttribute("selected") == 'false'){
            countDown.innerHTML = dislikeInt+1;
            thumbsDown.setAttribute("selected",'true');
            if(thumbsUp.getAttribute('selected')=='true'){
                thumbsUp.setAttribute('selected','false');
                countUp.innerHTML = likeInt - 1;
                thumbsUp.classList.toggle('highlight');
            }
            thumbsDown.classList.toggle('highlight');
        }
        else{
            thumbsDown.setAttribute("selected",'false');
            countDown.innerHTML = dislikeInt-1;
            thumbsDown.classList.toggle('highlight');
        }
    }
}

function addEventListenersPost(){
    var postContainer = document.getElementsByClassName('post-container');

    Array.prototype.forEach.call(postContainer, function(ele){
        ele.addEventListener('click',function(){
            ele.classList.toggle("enlargePhoto");
        });
        var redirects = ele.getElementsByClassName('post-redirect-item');
        Array.prototype.forEach.call(redirects, function(ele){
            ele.addEventListener('click', function(){
                loadPage('comment-page.html',initComment,ele.getAttribute('uid'));
            });
        });
        var thumbsUp = ele.getElementsByClassName('fa fa-thumbs-up')[0];
        var thumbsDown = ele.getElementsByClassName("fa fa-thumbs-down")[0];
        var upCount = ele.getElementsByClassName('like-count')[0];
        var downCount = ele.getElementsByClassName('dislike-count')[0];
        thumbsUp.addEventListener('click',function(){
            handleThumbsClick(upCount,thumbsUp,downCount,thumbsDown,'up');
        });
        thumbsDown.addEventListener('click',function(){
            handleThumbsClick(upCount,thumbsUp,downCount,thumbsDown,'down');
        });
    });
}