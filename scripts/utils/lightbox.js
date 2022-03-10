function addLightboxEvents() {
    
    document.querySelectorAll(".media").forEach( media => media.addEventListener("click", (event) => {
        openLightbox(event);
    }) );

    document.getElementById("closeLB").addEventListener("click", closeLB);    
    document.getElementById("prevLB").addEventListener("click", prevMedia);
    document.getElementById("nextLB").addEventListener("click", nextMedia);
}

let medias = [];
let currentIndex = 0;

function openLightbox(event) {
    medias = document.querySelectorAll("article");
    const url = event.target.attributes.src.value;
    medias.forEach( (media,index) => {
        if (media.firstElementChild.attributes.src.value === url) {
            currentIndex = index;
        }
    })
    document.getElementById("lightboxmodal").style.display = "block";
    document.getElementById("mediaLB").appendChild(medias[currentIndex].cloneNode(true));
    prepareNewMediaLB();

    document.getElementById("lightboxmodal").setAttribute("aria-hidden", "false");
    document.querySelector("header").setAttribute("aria-hidden", "true");
    document.querySelector("main").setAttribute("aria-hidden", "true");
}

function prevMedia() {
    const lightboxChild = document.querySelector("#mediaLB article");
    document.getElementById("mediaLB").removeChild(lightboxChild);
    currentIndex === 0 ? currentIndex = medias.length - 1 : currentIndex -= 1;
    document.getElementById("mediaLB").appendChild(medias[currentIndex].cloneNode(true));
    prepareNewMediaLB();
}

function nextMedia() {
    const lightboxChild = document.querySelector("#mediaLB article");
    document.getElementById("mediaLB").removeChild(lightboxChild);
    currentIndex === medias.length - 1 ? currentIndex = 0 : currentIndex += 1;
    document.getElementById("mediaLB").appendChild(medias[currentIndex].cloneNode(true));
    prepareNewMediaLB();
}

function closeLB() {
        const lightboxChild = document.querySelector("#mediaLB article");
        document.getElementById("mediaLB").removeChild(lightboxChild);
        document.getElementById("lightboxmodal").style.display = "none";
        document.getElementById("lightboxmodal").setAttribute("aria-hidden", "true");
        document.querySelector("header").setAttribute("aria-hidden", "false");
        document.querySelector("main").setAttribute("aria-hidden", "false");
}

function addVideoLightboxEvents() {
    const video = document.querySelector("#mediaLB video");
    video.play();
    video.parentElement.classList.remove("paused-video");

    video.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            video.parentElement.classList.remove("paused-video");
        } else {
            video.pause();
            video.parentElement.classList.add("paused-video")
        }
    })
}

function checkForVideoInLB() {
    if (document.querySelectorAll("#mediaLB img").length === 0) {
        addVideoLightboxEvents()
    };
}

function changeMediaRole() {
    const currentMedia = document.querySelector("#mediaLB article").firstElementChild
    currentMedia.setAttribute("role", currentMedia.getAttribute("role").slice(0,-5) );
}

function prepareNewMediaLB() {
    checkForVideoInLB();
    changeMediaRole();
}



