const path = window.location.href;
const photographerId = parseInt(path.substring(path.lastIndexOf('=')+1));

const photographerData = [];
const photographerMedia = [];

const getData = async () => {
    await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(data => {
            usePhotographersData(data);
            useMediaData(data);
        })
        .catch(error => console.log(error));
}

function completePhotographerCard() {
    const section = document.querySelector(".photograph-header");
    const photographer = new PhotographerFactory(photographerData[0]);
    section.innerHTML = photographer.createProfileHTML();
    document.getElementById("price").innerText = `${photographer.price}€/jour`
}

function completeSticky() {
    let likeCount = 0;
    photographerMedia.forEach(photo => likeCount += photo.likes);
    document.getElementById("like-counter").innerText = likeCount;
}


function createGalleryCard() {
    let template = "";
    const section = document.querySelector(".gallery-display");
    photographerMedia.forEach( media => {
        const newMedia = new MediaFactory(media);
        template += newMedia.createHTML();
    });
    section.innerHTML = template;
}


// Sorting

document.getElementById("filter-select").addEventListener("input", filterGallery);

function filterGallery() {
    const newFilter = document.getElementById("filter-select").value;
    switch(newFilter) {
        case "Popularité":
            sortGallery("likes");
        break;
        case "Date":
            sortGallery("date");
        break;
        case "Titre":
            sortGallery("title")
        break;
        default:
            return console.log("Error, invalid filter value");
        break;
    }  
}

function sortGallery(key) {
    const galleryArray = Array.from(document.querySelectorAll(`[data-${key}]`));
    const sortedGallery = sortByKey(galleryArray,key);
    sortedGallery.forEach(element => document.querySelector(".gallery-display").appendChild(element));
}

function sortByKey(array,key) {
    switch(key) {
        case "likes":
            return array.sort( function(a,b) {
                const x= a.dataset.likes, y=b.dataset.likes;
                return y-x;
            })
        break;
        case "title":
            return array.sort( function(a,b) {
                const x= a.dataset.title, y=b.dataset.title;
                if (x>y) return 1;
                if (y>x) return -1;
                return 0; 
            })
        break;
        case "date":
            return array.sort( function(a,b) {
                const x= new Date(a.dataset.date), y= new Date(b.dataset.date);
                if (x>y) return 1;
                if (y>x) return -1;
                return 0;
            })
        break;
    }
}

// Likes

function createLikeInteractions() {
    const likeButtons = document.querySelectorAll(".likes");
    const likeCounter = document.getElementById("like-counter");
    
    likeButtons.forEach(button => button.addEventListener("click", () => {
    if (button.getAttribute("data-liked") === "false") {
        button.closest("article").setAttribute('data-likes', parseInt(button.innerText) + 1);
        button.setAttribute("data-liked", "true");
        button.innerHTML = `${parseInt(button.innerText) + 1} <i class="fa-solid fa-heart"></i>`;
        likeCounter.innerText = parseInt(likeCounter.innerText) + 1 ;
    } else {
        button.closest("article").setAttribute('data-likes', parseInt(button.innerText) - 1);
        button.setAttribute("data-liked", "false");
        button.innerHTML = `${parseInt(button.innerText) - 1} <i class="fa-regular fa-heart"></i>` ;
        likeCounter.innerText = parseInt(likeCounter.innerText) - 1 ;
    }   
} ) )
}

// Keyboard Navigation Events 

function addKeyboardEvents() {
    document.addEventListener("keydown", event => {
        switch(event.key) {
            case "Esc":
            case "Escape":
                if ( document.getElementById("contact_modal").style.display === "block") {
                    closeModal();
                } else if (document.getElementById("lightboxmodal").style.display === "block") {
                    closeLB();
                }
            break;
            case "ArrowLeft":
                prevMedia();
            break;
            case "ArrowRight":
                nextMedia();
            break;
            case "Enter":
                document.activeElement.click();
            default:
            return '';
            break;
        }
    })
}


// Initialisation

function usePhotographersData(data) {
    photographerData.push( ...data.photographers.filter(photographer => photographer.id === photographerId ));
    completePhotographerCard();
    completeModal();
}

function useMediaData(data) {
    photographerMedia.push( ...data.media.filter( content => content.photographerId === photographerId ))
    completeSticky();
    createGalleryCard();
    filterGallery();
    createLikeInteractions();
    addEventLightbox();
    addKeyboardEvents();
}

function init() {  
    getData();
}

init();