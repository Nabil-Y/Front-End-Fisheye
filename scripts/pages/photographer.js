///////////////////////////////////////////
// Store photographer ID from the page path
///////////////////////////////////////////

const path = window.location.href;
const photographerId = parseInt(path.substring(path.lastIndexOf('=')+1));

/**
 * Fetch data from JSON
 */
const getData = async () => {
    await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(data => useData(data))
        .catch(error => console.log(error));
}

///////////////////////////////////////////
// Sorting
///////////////////////////////////////////  

/**
 * Get array of current gallery elements and sort it depending on the select menu value
 * @returns sorted array of current gallery elements
 */
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

/**
 * Add event on select menu change and filters gallery when page first loads
 */
const addGalleryFilterEvent = () => {
    document.getElementById("filter-select").addEventListener("input", filterGallery);
    filterGallery();
}

///////////////////////////////////////////
// Likes
///////////////////////////////////////////

/**
 * Add functionality to like section: incrementing, decrementing counters and changing heart icon
 */
const addLikeInteractions = () => {
    const likeButtons = document.querySelectorAll(".likes");
    const likeCounter = document.getElementById("like-counter");
    
    likeButtons.forEach(button => button.addEventListener("click", () => {
        let mediaLikes = parseInt(button.innerText);
        let totalLikes = parseInt(likeCounter.innerText);

        if (button.getAttribute("data-liked") === "false") {
            button.closest("article").setAttribute('data-likes', mediaLikes + 1);
            button.setAttribute("data-liked", "true");
            button.innerHTML = `${mediaLikes + 1} <i class="fa-solid fa-heart"></i>`;
            likeCounter.innerText = totalLikes + 1 ;
        } else {
            button.closest("article").setAttribute('data-likes', mediaLikes - 1);
            button.setAttribute("data-liked", "false");
            button.innerHTML = `${mediaLikes - 1} <i class="fa-regular fa-heart"></i>` ;
            likeCounter.innerText = totalLikes - 1 ;
        }

    }))
}

///////////////////////////////////////////
// Modal functions
///////////////////////////////////////////

/**
 * Show background content for everyone when modal is closed
 */
 const showBackgroundContent = () => {
    document.querySelector("header").setAttribute("aria-hidden", "false");
    document.querySelector("header").style.display = "block";
    document.querySelector("main").setAttribute("aria-hidden", "false");
    document.querySelector("main").style.display = "block";
}

/**
 * Hide background content for everyone when modal is opened
 */
const hideBackgroundContent = () => {
    document.querySelector("header").setAttribute("aria-hidden", "true");
    document.querySelector("header").style.display = "none";
    document.querySelector("main").setAttribute("aria-hidden", "true");
    document.querySelector("main").style.display = "none";
}

///////////////////////////////////////////
// Events
///////////////////////////////////////////

// Keyboard Navigation Events 

/**
 * Add events for keyboard navigation to be more accessible
 */
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
                if (document.getElementById("lightboxmodal").style.display === "block") {
                    changeMedia("down");
                }
            break;
            case "ArrowRight":
                if (document.getElementById("lightboxmodal").style.display === "block") {
                    changeMedia("up");
                }
            break;
            case "Enter":
                // Cancel the default action to prevent double clicks
                event.preventDefault();
                document.activeElement.click();
            default:
            return '';
            break;
        }
    })
}

/**
 * Add all events at first page load
 */
const addEvents = () => {
    addGalleryFilterEvent();
    addLikeInteractions();
    addLightboxEvents();
    addKeyboardEvents();
    addModalEvents();
}

///////////////////////////////////////////
// Initialization
///////////////////////////////////////////

/**
 * Create new and complete existing HTML with photographer data from JSON
 * @param {Object} data 
 */
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

/**
 * Create new and complete existing HTML with media data from JSON
 * @param {Object} data 
 */
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

/**
 * Use data fetched from JSON 
 * @param {Object} data 
 */
const useData = (data) => {
    usePhotographersData(data);
    useMediaData(data);
    addEvents();
}

/**
 * Initialize JS scripts, launched when page is loaded
 */
const init = () => {  
    getData();
}

init();

