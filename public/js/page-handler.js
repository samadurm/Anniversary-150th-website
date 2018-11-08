var homePage = document.getElementById("home-page");
var addPostPage = document.getElementById("addpost-page");
var aboutPage = document.getElementById("about-page");

document.getElementById("home-button").addEventListener('click',()=>{
    console.log('here');
    addPostPage.style.display = 'none';
    aboutPage.style.display = 'none';
    homePage.style.display = 'block';
});

document.getElementById("about-button").addEventListener('click',()=>{
    addPostPage.style.display = 'none';
    aboutPage.style.display = 'block';
    homePage.style.display = 'none';
});

document.getElementById("addpost-button").addEventListener('click',()=>{
    addPostPage.style.display = 'block';
    aboutPage.style.display = 'none';
    homePage.style.display = 'none';
});