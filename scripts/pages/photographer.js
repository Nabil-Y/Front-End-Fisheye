const path = window.location.href;
const photographerId = parseInt(path.substring(path.lastIndexOf('=')+1));

const photographerData = [];
const photographerMedia = [];

let likeCounter = 0;
let template = "";

async function getPhotographers() {
    await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(data => {
            const photographers = data.photographers;
            photographers.map( photographer => {
                if (photographer.id === photographerId) {
                    photographerData.push(photographer)
                }
            })
            completePhotographerCard();
        })
        .catch(error => console.log(error));
        console.log(photographerData); 
}

async function getMedia() {
    await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(data => {
            const mediaList = data.media;
            mediaList.map( media => {
                if (media.photographerId === photographerId) {
                    photographerMedia.push(media);
                }
            } )
            completeFooter();
            createGalleryCard()
        })
        .catch(error => console.log(error));
        console.log(photographerMedia);
}


function completePhotographerCard() {
    const {name, city, country, tagline, portrait} = photographerData[0];
    const img = document.createElement("img");

    document.getElementById("photographerName").innerText = name;
    document.getElementById("photographerLocation").innerText = `${city}, ${country}`;
    document.getElementById("photographerTagline").innerText = tagline;
    img.setAttribute("src", `./assets/photographers/${portrait}`)
    document.getElementById("photographerImage").appendChild(img);
    document.getElementById("price").innerText = `${photographerData[0].price}€/jour`;
}

function completeFooter() {
    photographerMedia.map(photo => likeCounter += photo.likes);
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

function getPhotographerName(id) {
    switch(id) {
        case 243:
        return "Mimi Keel";
        break;
        case 930:
        return "Ellie-Rose Wilkens";
        break;
        case 82:
        return "Tracy Galindo";
        break;
        case 527:
        return "Nabeel Bradford";
        break;
        case 925:
        return "Rhode Dubois";
        break;
        case 195:
        return "Marcel Nikolic";
        break;
        default:
        return "Error: Wrong ID";
        break;
    }
}

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

function init() {  
    getPhotographers();
    getMedia(); 
}

init();