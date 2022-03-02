const path = window.location.href;
const photographerId = parseInt(path.substring(path.lastIndexOf('=')+1));

const photographerData = [];
const photographerMedia = [];

let likeCounter = 0;
let template = "";

async function getPhotographers() {
    await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(data => usePhotoData(data))
        .catch(error => console.log(error));
        console.log(photographerData); 
}

async function getMedia() {
    await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(data => useMediaData(data))
        .catch(error => console.log(error));
        console.log(photographerMedia);
}


function completePhotographerCard() {
    const section = document.querySelector(".photograph-header");
    const photographer = new PhotographerFactory(photographerData[0]);
    section.innerHTML = photographer.createProfileHTML();
}

function completeSticky() {
    photographerMedia.forEach(photo => likeCounter += photo.likes);
    document.getElementById("like-counter").innerText = likeCounter;
}


function createGalleryCard() {
    const section = document.querySelector(".gallery-section");
    photographerMedia.forEach( media => {
        const newMedia = new MediaFactory(media);
        template += newMedia.createHTML();
    });
    section.innerHTML = template;
}


// Triage

document.getElementById("filter-select").addEventListener("input", updateGallery);

function updateGallery() {
    const newFilter = document.getElementById("filter-select").value;
    switch(newFilter) {
        case "Popularité":
            return photographerMedia.sort( (a,b) => {
                const x=a[likes], y=b[likes];
                return x-y;
            });
        break;
        case "Date":
            return photographerMedia.sort( (a,b) => {
                const x=a[Date.parse(date)], y=b[Date.parse(date)];
                return x-y;
            });
        break;
        case "Titre":
            return photographerMedia.sort( (a,b) => {
                const x=a[title], y=b[titles];
                return x-y;
            });
        break;
        default:
            return console.log("Error, invalid filter value");
        break;
    }  
}

function sortByKey(array,key) {
    return array.sort( (a,b) => {
        const x=a[key], y=b[key];
        return x-y;
    })
}


// Initialisation

function usePhotoData(data) {
    photographerData.push( ...data.photographers.filter(photographer => photographer.id === photographerId ));
    completePhotographerCard();
}

function useMediaData(data) {
    photographerMedia.push( ...data.media.filter( content => content.photographerId === photographerId ))
    completeSticky();
    createGalleryCard()
}

function init() {  
    getPhotographers();
    getMedia(); 
}

init();