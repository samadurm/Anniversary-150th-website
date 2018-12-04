
function initSearch(id = null){
    var jsonreq = new XMLHttpRequest();
    jsonreq.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            filterSearch(this.responseText,id);
        }
        if(this.readyState == XMLHttpRequest.DONE && this.status == 404){
            alert("error occured in loading image json");
        }
    };
    jsonreq.open('GET','image-data.json',true);
    jsonreq.send();

}

  function filterSearch (jsonInfo,id) {
    	var imgData = JSON.parse(jsonInfo);
    	if(id){
    		$.each(imgData,function(index,value){
    			if(value.id == id){
    				commentIDX = index;
    			}
    		});
    	}

      lookForInput(imgData);
      addEventListenersPost();

}

function lookForInput (imgData) {

  var counter = 0;

  var valueText = document.getElementById('input-search').value;

  valueText = valueText.toLowerCase();

  for ( var i = 0; i < imgData.length; i++ ) {

    var author = imgData[i].creator;

    author = author.toLowerCase();

    var title = imgData[i].title;

    title = title.toLowerCase();

    if ( (author.includes(valueText) == true) || (title.includes(valueText) == true) ){

      author = imgData[i].creator;
      id = imgData[i].id;
      data = imgData[i].data;
      title = imgData[i].title;
      goodRating = parseInt(imgData[i].goodRating);
      badRating = parseInt(imgData[i].badRating);

      newPhotoHTML = makeNewPost ( author, id, data, title, goodRating, badRating );
      var insertIntoDOM = document.getElementById ('searched-values');
      insertIntoDOM.insertAdjacentHTML('beforeend', newPhotoHTML);

      counter++;

    }

  }

  if ( counter === 0 ) {

    var div = document.createElement("div");

    div.classList.add("err-div-first");

    var newContent = document.createTextNode(" No Posts Found ");

    div.appendChild(newContent);

    var secondTwo = document.createElement("div");

    secondTwo.classList.add("err-div-second");

    var newerContent = document.createTextNode("Please Try Again or Press The All Posts Tab To See Posts");

    secondTwo.appendChild(newerContent);

    var insertIntoDOM = document.getElementById ('searched-values');

    insertIntoDOM.appendChild (div);

    insertIntoDOM.appendChild(secondTwo);

  }

}


function makeNewPost ( author, id, data, title, goodRating, badRating ) {

  var postTemplateToPost = Handlebars.templates.post;

  var newPhotoHTML = postTemplateToPost ({

    creator: author,

    data: data,

    id: id,

    title: title,

    goodRating: goodRating,

    badRating: badRating

  });

  return newPhotoHTML;

}
