var commentIDX = 0;

console.log ( " We Made It Here: " );

function initBrowse(id = null){
    var jsonreq = new XMLHttpRequest();
    jsonreq.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            displayComments(this.responseText,id);
        }
        if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
            alert("error occured in loading image json");
        }
    };
    jsonreq.open('GET','image-data.json',true);
    jsonreq.send();
}
    function displayComments(jsonInfo,id) {
    	var imgData = JSON.parse(jsonInfo);
    	if(id){
    		$.each(imgData,function(index,value){
    			if(value.id == id){
    				commentIDX = index;
    			}
    		});
    	}
      for ( var i = 0; i < imgData.length ; i++ ) {
        console.log ( " We Made It Here: ", imgData[i] );
      }
}
