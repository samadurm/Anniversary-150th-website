
function initPost(callback = displayPosts){
    var jsonreq = new XMLHttpRequest();
    jsonreq.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            callback(this.responseText);
        }
        if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
            alert("error occured in loading image json");
        }
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