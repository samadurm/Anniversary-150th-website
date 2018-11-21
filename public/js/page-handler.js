document.getElementById("home-button").addEventListener('click',function(){
    loadPage(this.getAttribute("loadedpage"));
});

document.getElementById("about-button").addEventListener('click',function(){
    loadPage(this.getAttribute("loadedpage"));
});

document.getElementById("addpost-button").addEventListener('click',function(){
    loadPage(this.getAttribute("loadedpage"),init);
});

function loadPage(path,callback = function(){}){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE || this.status == 200){
            document.getElementById("subpage-holder").innerHTML = this.responseText;
            callback();
        }
    };
    xhttp.open("GET",path,true);
    xhttp.send();
}
