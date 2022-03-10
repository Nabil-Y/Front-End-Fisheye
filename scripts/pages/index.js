/**
 * Fetch data from JSON
 */
const getData = async () => {
    await fetch("./data/photographers.json")
        .then(response => response.json())
        .then(data =>createHomePhotographersCard(data))
        .catch(error => console.log(error));
}

/**
 * Dynamically create home page HTML with fetched data
 * @param {Object} data 
 */
const createHomePhotographersCard = (data) => {
    let template = "";
    const photographersData = [];
    const section = document.querySelector(".photographer_section");
    photographersData.push(data.photographers)
    photographersData[0].forEach( photographer => {
        const newPhotographer = new PhotographerFactory(photographer);
        template += newPhotographer.createHomeHTML();
    })
    section.innerHTML = template;
}

/**
 * Initialize JS scripts, launched when page is loaded
 */
const init = () => {
    getData();
}

init();
