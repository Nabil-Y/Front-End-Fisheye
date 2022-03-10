let medias = [];
let currentIndex = 0;

///////////////////////////////////////////
// Events
///////////////////////////////////////////  

/**
 * Create Lightbox events
 */
const addLightboxEvents = () => {
    document.querySelectorAll(".media").forEach( media => media.addEventListener("click", (event) => {
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
    
    //Check current index of media clicked
    const url = event.target.attributes.src.value;
    medias.forEach( (media,index) => {
        if (media.firstElementChild.attributes.src.value === url) {
            currentIndex = index;
        }
    })

    // Display lightbox content
    document.getElementById("lightboxmodal").style.display = "block";
    document.getElementById("lightboxmodal").setAttribute("aria-hidden", "false");
    document.getElementById("mediaLB").appendChild(medias[currentIndex].cloneNode(true));
    prepareNewMediaLB();
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
    prepareNewMediaLB();
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
        addVideoLightboxEvents()
    };
}

/**
 * Change ARIA role for media imported in lightbox
 */
const changeMediaAriaRole = () => {
    const currentMedia = document.querySelector("#mediaLB article").firstElementChild;
    currentMedia.setAttribute("role", currentMedia.getAttribute("role").slice(0,-5) );
}

/**
 * Function to perform checks when a new Media is displayed in the lightbox
 */
const prepareNewMediaLB = () => {
    checkForVideoInLB();
    changeMediaAriaRole();
}




