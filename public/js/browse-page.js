var commentIDX = 0;

function initBrowse(id = null) {
    var jsonreq = new XMLHttpRequest();
    jsonreq.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            filterLikes(this.responseText, id);
        }
        if (this.readyState == XMLHttpRequest.DONE && this.status == 404) {
            alert("error occured in loading image json");
        }
    };
    jsonreq.open('GET', 'image-data.json', true);
    jsonreq.send();

}

function filterLikes(jsonInfo, id) {
    var imgData = JSON.parse(jsonInfo);
    if (id) {
        $.each(imgData, function(index, value) {
            if (value.id == id) {
                commentIDX = index;
            }
        });
    }

    findMostLikes(imgData);
    //
    findMostDisLikes(imgData);

    findRandom(imgData);

    addEventListenersPost();

}

function findMostLikes(imgData) {

    var newPhotoHTML;

    var newImageData;

    // console.log( "==imgData in sort function", imgData);

    for (var i = 0; i < imgData.length - 1; i++) {
        for (var j = 0; j < imgData.length - i - 1; j++) {
            if (parseInt(imgData[j].goodRating) < parseInt(imgData[j + 1].goodRating)) {
                newImageData = swap(imgData, j);
            }
        }
    }

    for (var i = 0; i < 3; i++) {

        author = imgData[i].creator;
        id = imgData[i].id;
        data = imgData[i].data;
        title = imgData[i].title;
        goodRating = parseInt(imgData[i].goodRating);
        badRating = parseInt(imgData[i].badRating);

        newPhotoHTML = makeNewPost(author, id, data, title, goodRating, badRating);
        var insertIntoDOM = document.getElementById('most-likes-posts');
        insertIntoDOM.insertAdjacentHTML('beforeend', newPhotoHTML);

    }

}

function swap(imgData, j) {

    var temp = imgData[j + 1];

    imgData[j + 1] = imgData[j];

    imgData[j] = temp;

    return imgData;

}


function findMostDisLikes(imgData) {

    var newPhotoHTML;

    for (var i = 0; i < imgData.length - 1; i++) {
        for (var j = 0; j < imgData.length - i - 1; j++) {
            if (parseInt(imgData[j].badRating) < parseInt(imgData[j + 1].badRating)) {
                newImageData = swap(imgData, j);
            }
        }
    }

    for (var i = 0; i < 3; i++) {

        author = imgData[i].creator;
        id = imgData[i].id;
        data = imgData[i].data;
        title = imgData[i].title;
        goodRating = parseInt(imgData[i].goodRating);
        badRating = parseInt(imgData[i].badRating);

        newPhotoHTML = makeNewPost(author, id, data, title, goodRating, badRating);
        var insertIntoDOM = document.getElementById('most-dislikes-posts');
        insertIntoDOM.insertAdjacentHTML('beforeend', newPhotoHTML);

    }


}

function makeNewPost(author, id, data, title, goodRating, badRating) {

    var postTemplateToPost = Handlebars.templates.post;

    var newPhotoHTML = postTemplateToPost({

        creator: author,

        data: data,

        id: id,

        title: title,

        goodRating: goodRating,

        badRating: badRating

    });

    return newPhotoHTML;

}

function checkArrayForNumbers(usedNumbers, randomNumber) {

    for (var i = 0; i < usedNumbers.length; i++) {

        if (usedNumbers[i] === randomNumber) {

            return false;

        }


    }

    return true;

}


function findRandom(imgData) {

    var usedNumbers = []

    var newPhotoHTML;

    for (var i = 0; i < 3; i++) {

        var randomNumber = rand(0, imgData.length - 1);

        while (checkArrayForNumbers(usedNumbers, randomNumber) === false) {
            randomNumber = rand(0, imgData.length - 1);
        }

        usedNumbers.push(randomNumber);

        author = imgData[randomNumber].creator;
        id = imgData[randomNumber].id;
        data = imgData[randomNumber].data;
        title = imgData[randomNumber].title;
        goodRating = parseInt(imgData[randomNumber].goodRating);
        badRating = parseInt(imgData[randomNumber].badRating);

        newPhotoHTML = makeNewPost(author, id, data, title, goodRating, badRating);

        var insertIntoDOM = document.getElementById('random-posts');
        insertIntoDOM.insertAdjacentHTML('beforeend', newPhotoHTML);

    }

}

function rand(min, max) {
    var offset = min;
    var range = (max - min) + 1;

    var randomNumber = Math.floor(Math.random() * range) + offset;
    return randomNumber;
}
