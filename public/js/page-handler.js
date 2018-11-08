const homePage = document.getElementById("home-page");
const addPostPage = document.getElementById("addpost-page");
const aboutPage = document.getElementById("about-page");

addPostPage.style.display = 'none';
aboutPage.style.display = 'none';

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