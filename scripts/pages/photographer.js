const path = window.location.href;
const photographerId = parseInt(path.substring(path.lastIndexOf('=')+1));

const photographerData = [];
const photographerMedia = [];

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
        })
        .catch(error => console.log(error));
        console.log(photographerMedia);
}


getPhotographers();
getMedia();


function completePhotographerCard() {
    const {name, city, country, tagline, portrait} = photographerData[0];
    const img = document.createElement("img");

    document.getElementById("photographerName").innerText = name;
    document.getElementById("photographerLocation").innerText = `${city}, ${country}`;
    document.getElementById("photographerTagline").innerText = tagline;
    img.setAttribute("src", `./assets/photographers/${portrait}`)
    document.getElementById("photographerImage").appendChild(img);
}




// function createPhotographerCard() {
//     let template = "";
//     const section = document.querySelector(".photographer_section");
//     photographersData[0].map(item => {
//         const {name,portrait,city,country,tagline,price,id} = item;
//         template += `<article>
//         <a href="./photographer.html/${id}">
//             <img src="./assets/photographers/${portrait}" alt=${name}>
//             <h2>${name}</h2>
//         </a>
//         <p class="location">${city}, ${country}</p>
//         <p>${tagline}</p>
//         <p class="price">${price}€/jour</p>
//         </article>`
//     });
//     section.innerHTML = template;
// }