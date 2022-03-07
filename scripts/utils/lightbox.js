function addEventLightbox() {
    
    document.querySelectorAll(".media").forEach( media => media.addEventListener("click", (event) => {
        openLightbox(event);
    }) );

    document.getElementById("closeLB").addEventListener("click", () => {
        const lightboxChild = document.querySelector("#mediaLB article");
        document.getElementById("mediaLB").removeChild(lightboxChild);
        document.getElementById("lightboxmodal").style.display = "none";

    })



    document.getElementById("prevLB").addEventListener("click", prevMedia);
    document.getElementById("nextLB").addEventListener("click", nextMedia);
}

let medias = [];
let currentIndex = 0;

function openLightbox(event) {
    medias = Array.from(document.querySelectorAll("article"));
    const url = event.target.attributes.src.value;
    medias.forEach( (media,index) => {
        if (media.firstElementChild.attributes.src.value === url) {
            currentIndex = index;
        }
    })
    document.getElementById("lightboxmodal").style.display = "block";
    document.getElementById("mediaLB").appendChild(medias[currentIndex].cloneNode(true));
    addVideoLightboxEvents();
}

function prevMedia() {
    const lightboxChild = document.querySelector("#mediaLB article");
    document.getElementById("mediaLB").removeChild(lightboxChild);
    currentIndex === 0 ? currentIndex = medias.length - 1 : currentIndex -= 1;
    document.getElementById("mediaLB").appendChild(medias[currentIndex].cloneNode(true));
}

function nextMedia() {
    const lightboxChild = document.querySelector("#mediaLB article");
    document.getElementById("mediaLB").removeChild(lightboxChild);
    currentIndex === medias.length - 1 ? currentIndex = 0 : currentIndex += 1;
    document.getElementById("mediaLB").appendChild(medias[currentIndex].cloneNode(true));
}

function addVideoLightboxEvents() {
    const videos = document.querySelectorAll("#mediaLB video");
    videos.forEach(video => video.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            video.parentElement.classList.remove("unplayed-video");
        } else {
            video.pause();
            video.parentElement.classList.add("unplayed-video")
        }
    }))
}



// const fileType = event.target.attributes.src.value.slice(-3);
// if (fileType === "mp4") {
//     videoControls();
// }
// console.log(event.target.attributes.src);
// event.target.parentElement.classList.remove("unplayed-video");
// event.target.controls = true;
// event.target.play();





