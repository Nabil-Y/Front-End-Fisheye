const path = window.location.href;
const photographerId = parseInt(path.substring(path.lastIndexOf('=')+1));

const getData = async () => {
    await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(data => useData(data))
        .catch(error => console.log(error));
}

// Sorting

const filterGallery = () => {
    let sortedGallery;
    const newFilter = document.getElementById("filter-select").value;

    switch(newFilter) {
        case "Popularité":
            sortedGallery = Array.from(document.querySelectorAll(`[data-likes]`))
                .sort( (a,b) => {
                    const x= a.dataset.likes, y=b.dataset.likes;
                    return y-x;
                })
        break;
        case "Date":
            sortedGallery = Array.from(document.querySelectorAll(`[data-date]`))
                .sort( (a,b) => {
                    const x= new Date(a.dataset.date), y= new Date(b.dataset.date);
                    if (x>y) return 1;
                    if (y>x) return -1;
                    return 0;
                })
        break;
        case "Titre":
            sortedGallery = Array.from(document.querySelectorAll(`[data-title]`))
                .sort( (a,b) => {
                    const x= a.dataset.title, y=b.dataset.title;
                    if (x>y) return 1;
                    if (y>x) return -1;
                    return 0; 
                })
        break;
        default:
            return console.log("Error, invalid filter value");
        break;
    } 

    return sortedGallery.forEach(element => document.querySelector(".gallery-display").appendChild(element));
}

const addGalleryFilterEvent = () => {
    document.getElementById("filter-select").addEventListener("input", filterGallery);
    filterGallery();
}

// Likes

const addLikeInteractions = () => {
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
    }))
}

// Events

// Keyboard Navigation Events 

const addKeyboardEvents = () => {
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
                if (document.activeElement.getAttribute("role") !== "button") {
                    document.activeElement.click();
                }
            default:
            return '';
            break;
        }
    })
}

const addEvents = () => {
    addGalleryFilterEvent();
    addLikeInteractions();
    addLightboxEvents();
    addKeyboardEvents();
    addModalEvents();
}


// Initialisation

const usePhotographersData = (data) => {
    // Create top photographer section HTML
    const section = document.querySelector(".photograph-header");

    const photographerData = [];
    photographerData.push( ...data.photographers.filter(photographer => photographer.id === photographerId ));
    
    const photographer = new PhotographerFactory(photographerData[0]);
    section.innerHTML = photographer.createProfileHTML();

    // Complete sticky price info
    document.getElementById("price").innerText = `${photographer.price}€/jour`;

    // Complete contact modal title info
    document.getElementById("contact-title").innerText = `Contactez-moi\r ${photographerData[0].name}`;
    document.getElementById("contact_modal").setAttribute("aria-labelledby", "contact-title");
}

const useMediaData = (data) => {
    // Create Gallery HTML
    let template = "";
    const section = document.querySelector(".gallery-display");
    const photographerMedia = [];
    photographerMedia.push( ...data.media.filter( content => content.photographerId === photographerId ))

    photographerMedia.forEach( media => {
        const newMedia = new MediaFactory(media);
        template += newMedia.createHTML();
    });
    section.innerHTML = template;

    // Complete sticky likes info
    let likeCount = 0;
    photographerMedia.forEach(photo => likeCount += photo.likes);
    document.getElementById("like-counter").innerText = likeCount;
}

const useData = (data) => {
    usePhotographersData(data);
    useMediaData(data);
    addEvents();
}

const init = () => {  
    getData();
}

init();

