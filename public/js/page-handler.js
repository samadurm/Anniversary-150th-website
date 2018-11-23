document.getElementById("home-button").addEventListener('click',function(){
    loadPage(this.getAttribute("loadedpage"));
});

document.getElementById("post-button").addEventListener('click',function(){
    loadPage(this.getAttribute("loadedpage"),initPost);
});

document.getElementById("addpost-button").addEventListener('click',function(){
    loadPage(this.getAttribute("loadedpage"),initAddpost);
});

function loadPage(path,callback = function(){}){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            document.getElementById("subpage-holder").innerHTML = this.responseText;
            callback();
        }
        if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
            alert("error occured in loading page");
        }
    };
    xhttp.open("GET",path,true);
    xhttp.send();
}
