let medias = [];
let currentIndex = 0;

///////////////////////////////////////////
// Events
///////////////////////////////////////////  

/**
 * Create Lightbox events
 */
const addLightboxEvents = () => {
    document.querySelectorAll(".media-link").forEach( media => media.addEventListener("click", (event) => {
        openLightbox(event);
    }) );

    document.getElementById("closeLB").addEventListener("click", closeLB);    
    document.getElementById("prevLB").addEventListener("click", changeMedia);
    document.getElementById("nextLB").addEventListener("click", changeMedia);
}

// Events functions

/**
 * Event function to display lightbox when a media is clicked (Enter key behaves like click)
 * @param {MouseEvent} event 
 */
const openLightbox = (event) => {
    // Store current gallery elements in node list
    medias = document.querySelectorAll("article");
    console.log(medias)
    
    //Check current index of media clicked
    console.log(event.currentTarget);
    const url = event.currentTarget.firstElementChild.attributes.src.value;
    medias.forEach( (media,index) => {
        if (media.firstElementChild.firstElementChild.attributes.src.value === url) {
            currentIndex = index;
        }
    })

    // Display lightbox content
    document.getElementById("lightboxmodal").style.display = "block";
    document.getElementById("lightboxmodal").setAttribute("aria-hidden", "false");
    document.getElementById("mediaLB").appendChild(medias[currentIndex].cloneNode(true));
    newMediaCheckInLB();
    hideBackgroundContent();
}

/**
 * Event function to hide lightbox when the close button or escape key is used
 */
const closeLB = () => {
    const lightboxChild = document.querySelector("#mediaLB article");
    document.getElementById("mediaLB").removeChild(lightboxChild);
    document.getElementById("lightboxmodal").style.display = "none";
    document.getElementById("lightboxmodal").setAttribute("aria-hidden", "true");
    showBackgroundContent();
}

/**
 * Event function to navigate in lightbox depending on arrow key pressed or button clicked 
 * @param {string} order 
 */
const changeMedia = (order) => {
    const lightboxChild = document.querySelector("#mediaLB article");
    document.getElementById("mediaLB").removeChild(lightboxChild);
    if (document.activeElement.id === "prevLB" || order === "down") {
        currentIndex === 0 ? currentIndex = medias.length - 1 : currentIndex -= 1;
    } else if (document.activeElement.id === "nextLB" || order === "up") {
        currentIndex === medias.length - 1 ? currentIndex = 0 : currentIndex += 1;
    }
    document.getElementById("mediaLB").appendChild(medias[currentIndex].cloneNode(true));
    newMediaCheckInLB();
}

///////////////////////////////////////////
// MEDIA functions
///////////////////////////////////////////  

/**
 * Event function to launch/pause video and display/hide playbutton depending on video state
 */
const toggleVideo = () => {
    const video = document.querySelector("#mediaLB video")
    video.paused ? video.play() : video.pause();
    video.parentElement.classList.toggle("paused-video");
}

/**
 * Event function launched when video is displayed in lightbox
 */
const addVideoLightboxEvents = () => {
    toggleVideo();
    document.querySelector("#mediaLB video").addEventListener("click", toggleVideo);
}

/**
 * Event function to check if a video is displayed in lightbox
 */
const checkForVideoInLB = () => {
    if (document.querySelectorAll("#mediaLB video").length === 1) {
        addVideoLightboxEvents();
    };
}

/**
 * Event function to remove link and keep content inside to display in lighbox media
 */
const removeLinkInLB = () => {
    const link = document.querySelector("#mediaLB .media-link")
    link.replaceWith(link.firstElementChild);

    // Set tabindex = 0 for img in lighbox
    if (document.querySelectorAll("#mediaLB img").length === 1) {
        document.querySelector("#mediaLB img").setAttribute("tabindex", "0");
    };
}

/**
 * Event function to hide likes for eyes and screen readers
 */
const hideLikesinLB = () => {
    const likes = document.querySelector("#mediaLB .likes");
    likes.style.display = "none";
    likes.setAttribute("aria-hidden", "true");
}

const newMediaCheckInLB = () => {
    checkForVideoInLB();
    removeLinkInLB();
    hideLikesinLB();
}