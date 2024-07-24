let newImage;
let imageIndex = 1;
const imageContainer = $("#background-image-container");
let image = imageContainer.children("img");
const totalImages = 9;
const preloadedImages = [];

// Preload all images
function preloadImages() {
    for (let i = 1; i <= totalImages; i++) {
        const img = new Image();
        img.src = `assets/images/hero-images/image${i}.png`;
        preloadedImages.push(img);
    }
}

function changeBackgroundImage() {
    imageIndex = imageIndex === totalImages ? 1 : imageIndex + 1;
    // console.log(imageIndex);
    newImage = preloadedImages[imageIndex - 1].cloneNode(false);
    newImage.alt = "background image";
    newImage.style.zIndex = '-1';
    newImage.classList.add("fade-in");
    imageContainer.append(newImage);

    setTimeout(() => {
        newImage.style.zIndex = '-2';
        image.remove();
        image = newImage;
    }, 1500);
}

// Start preloading images
preloadImages();

// Wait for all images to load before starting the interval
Promise.all(preloadedImages.map(img => {
    return new Promise((resolve) => {
        if (img.complete) {
            resolve();
        } else {
            img.onload = resolve;
        }
    });
})).then(() => {
    console.log("All images preloaded");
    setInterval(changeBackgroundImage, 6000);
});



// ------------------------------ BANNER ------------------------------

let bannerContainer = $("#moving-banner");
const banner = `
<div class='wrap'>
    <p>They trust us:</p>
    <p>LVMH with Cheval Blanc</p>
    <p>Mandarin Oriental Hotel Group</p>
    <p>Peninsula Hotels</p>
    <p>Shangri-la Hotels and Resorts</p>
    <p>La Maison Lameloise</p>
    <p>Hotel Barrière Fouquet's</p>
    <p>and many more beautiful groups and properties...</p>
</div>`;

function movingBanner () {
    bannerContainer.empty();
    bannerContainer.append(banner); /* Append the first banner */

    let viewportWidth = $(window).width();
    let bannerWidth = $('#moving-banner .wrap:first-child').outerWidth();

    while (viewportWidth > bannerWidth) { /* Duplicate the banner until it fills the screen */
        console.log("duplicating banner")
        bannerContainer.append(banner);
        bannerWidth += banner.outerWidth();
    } 

    bannerContainer.append(banner); /* Append an extra banner for infinite scroll effect */
    /*
    1920px = 30s
    */
}

$(document).ready(movingBanner());
$(window).resize(movingBanner());

// ------------------------------ Scroll down ------------------------------

let scrollDown = $("#scroll-down");
let idleTimeout;
let isIdle = false;


$(document).ready(function() {
    idleTimeout = setTimeout(() => {
        isIdle = true;
    }, 5000);

    setInterval(function() {
        if ($(window).width() < 768) return;
        scrollDown.toggleClass("visible", isIdle);
    }, 1000);
});

$(document).on('scroll', function() {
    // console.log($(window).scrollTop());
    if ($(window).scrollTop() > 0) {
        isIdle = false;
        clearTimeout(idleTimeout);
        return;
    }

    isIdle = false;
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
        isIdle = true;
    }, 5000);
});

// ------------------------------ COPY FN ------------------------------

function copy(element) {
    // Get the text content of the clicked <a> tag
    let text = element.textContent;

    let type = element.dataset.type;
    
    // Copy the text to clipboard
    navigator.clipboard.writeText(text).then(() => {
        alert(`${type} copied to clipboard: ${text}`);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  }