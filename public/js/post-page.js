function initPost(){
    addEventListenersPost();
}

function handleThumbsClick(countUp,thumbsUp,countDown,thumbsDown,type,id){
    var likeInt = parseInt(countUp.innerHTML);
    var dislikeInt = parseInt(countDown.innerHTML);
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
    var allPosts = document.getElementsByClassName('post-container');
    var idx = 0;
    var count = 0;
    Array.prototype.forEach.call(allPosts,function(ele){
        if(ele.getAttribute('uid') == id){
            idx = count;
        }
        count++;
    });
    SendAjaxPost(parseInt(countUp.innerHTML),parseInt(countDown.innerHTML),idx);
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
            handleThumbsClick(upCount,thumbsUp,downCount,thumbsDown,'up',ele.getAttribute('uid'));
        });
        thumbsDown.addEventListener('click',function(){
            handleThumbsClick(upCount,thumbsUp,downCount,thumbsDown,'down',ele.getAttribute('uid'));
        });
    });
}

function SendAjaxPost(goodCount,badCount,idx){
	var CommentCount={"goodCount":goodCount,"badCount":badCount,"idx" : idx};
	var postreq = new XMLHttpRequest();
	postreq.open('POST','CommentCount',true);
	postreq.setRequestHeader('Content-Type','application/json');
	postreq.send(JSON.stringify(CommentCount));
}