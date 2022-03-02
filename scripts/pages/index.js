const photographersData = [];

async function getPhotographers() {
    await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(data => {
            photographersData.push(data.photographers)
            createPhotographerCard();
        })
        .catch(error => console.log(error));
}

function createPhotographerCard() {
    let template = "";
    const section = document.querySelector(".photographer_section");
    photographersData[0].map( photographer => {
        const newPhotographer = new PhotographerFactory(photographer);
        template += newPhotographer.createHTML();
    })
    section.innerHTML = template;
}

getPhotographers();

