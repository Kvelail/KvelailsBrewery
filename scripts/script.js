const navbarToggler = document.querySelector('.navbar-toggler');
const navbarLinks = document.querySelectorAll('.navbar-link');
const navbarList = document.querySelector('.navbar-links');
const headerBtns = document.querySelectorAll('.header-btn');
const header = document.querySelector('#header');
const aboutSlider = document.querySelector('.about-slider');
const aboutBoxOne = document.querySelector('.about-box-1');
const aboutBoxTwo = document.querySelector('.about-box-2');
const aboutRight = document.querySelector('.about-right');
const aboutLeft = document.querySelector('.about-left');
const shopCenterMain = document.querySelector('.shop-center-main');
const shopRight = document.querySelector('.shop-right');
const shopLeft = document.querySelector('.shop-left');
const shopCenterLeft = document.querySelector('.shop-center-left');
const shopCenterRight = document.querySelector('.shop-center-right');
const statsSpan = document.querySelectorAll('.stats-span');
const stats = document.querySelector('#stats');


/* Header */
const showNavbar = () => {

    navbarList.classList.toggle('show-navbar');
    navbarToggler.classList.toggle('show-navbar');

};

const removeNavbar = () => {

    navbarList.classList.remove('show-navbar');

};

let backgroundCounter = 1;

const changeBackground = () => {

    header.style.backgroundImage = `url(img/header-img${backgroundCounter}.jpg)`;
    backgroundCounter++;
    if(backgroundCounter > 3) {
        backgroundCounter = 1;
    }

};

navbarToggler.addEventListener('click', showNavbar);
navbarLinks.forEach(link => link.addEventListener('click', removeNavbar));
setInterval(changeBackground, 10000);
/* End of Header */

/* About */
let aboutCounter = -50;

const slideAbout = () => {

    aboutSlider.style.transform = `translate(${aboutCounter}%)`;
   
    if(aboutCounter === -50) {
        aboutCounter = 0;
        aboutBoxTwo.classList.add('about-drop');
    } else if (aboutCounter === 0) {
        aboutCounter = -50;
        aboutBoxOne.classList.add('about-drop');
    } 


};

const removeDrop = e => {

    if(e.propertyName === 'transform') {
        aboutBoxTwo.classList.remove('about-drop');
        aboutBoxOne.classList.remove('about-drop');
    }

};

const aboutMove = () => {
    setInterval(slideAbout, 6000);
    aboutSlider.addEventListener('transitionend', removeDrop);
};

const moveAboutRight = () => {
    aboutSlider.style.transform = `translate(${-50}%)`;
};

const moveAboutLeft = () => {
    aboutSlider.style.transform = `translate(${0}%)`;
};

let width = window.innerWidth;
let targetWidth = 768;

if ( width <= targetWidth) {     
    aboutMove();
} 

aboutRight.addEventListener('click', moveAboutRight);
aboutLeft.addEventListener('click', moveAboutLeft);
/* End of About */

/* Shop */
let shopCounter = 0;
let shop;

const getShop = async () => {

    const base = 'https://api.punkapi.com/v2/beers?ids=4|5|6|7|8|9';

    const response = await fetch(base);
    const data = await response.json();

    return data;

};


const displayShop = shop => {

    const shopItems = shop.map(item => {
        return `
        <div class="shop-img">
            <img src=${item.image_url} alt=${item.name}>
        </div>
        <h3 class="shop-name">${item.name}</h3>
        <h3 class="shop-first-brewed">first brewed: ${item.first_brewed}</h3>
        <h3 class="shop-abv">abv: ${item.abv}</h3>
        <p class="shop-desc">"${item.description}"</p>

        `;
    });

    shopCenterMain.innerHTML = shopItems[shopCounter];

};


const shopNext = () => {

    shopCounter = shopCounter < shop.length - 1 ? ++shopCounter : shop.length - 1;
    displayShop(shop);

};

const shopPrev = () => {

    shopCounter = shopCounter > 0 ? --shopCounter : 0;
    displayShop(shop);

};




shopLeft.addEventListener('click', shopPrev);
shopRight.addEventListener('click', shopNext);

window.addEventListener('DOMContentLoaded', async () => {
    shop = await getShop();
    await displayShop(shop);
    
});



shopCenterRight.addEventListener('click', shopNext);
shopCenterLeft.addEventListener('click', shopPrev);

/* End of Shop */

/* Stats */
function showCounters () {
    showCounters = function(){};
    let statsCounter = 0;
    let statsCounter_2 = 0;
    let statsCounter_3 = 0;
    let statsCounter_4 = 0;

    const statsInterval = setInterval(() => {
        if(statsCounter <= 55) {
            statsSpan[0].textContent = `${statsCounter}`;
            statsCounter++;
        } 

        if(statsCounter_2 <= 79) {
            statsSpan[1].textContent = `${statsCounter_2}`;
            statsCounter_2++;
        } else {
            clearInterval(statsInterval);
        }
        
        if(statsCounter_3 <= 60) {
            statsSpan[2].textContent = `${statsCounter_3}`;
            statsCounter_3++;
        } 
        
        if(statsCounter_4 <= 32) {
            statsSpan[3].textContent = `${statsCounter_4}`;
            statsCounter_4++;
        } 
    }, 10);
}

window.addEventListener('scroll', () => {
    const scrollHeight = pageYOffset;
    const statsTop = stats.offsetTop - 600;
    if(scrollHeight >= statsTop) {
        showCounters();
    } 
    
});
/* End ofStats */


