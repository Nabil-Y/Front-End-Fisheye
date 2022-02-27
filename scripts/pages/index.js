    // async function getPhotographers() {
    //     // Penser à remplacer par les données récupérées dans le json
    //     const photographers = [
    //         {
    //             "name": "Ma data test",
    //             "id": 1,
    //             "city": "Paris",
    //             "country": "France",
    //             "tagline": "Ceci est ma data test",
    //             "price": 400,
    //             "portrait": "account.png"
    //         },
    //         {
    //             "name": "Autre data test",
    //             "id": 2,
    //             "city": "Londres",
    //             "country": "UK",
    //             "tagline": "Ceci est ma data test 2",
    //             "price": 500,
    //             "portrait": "account.png"
    //         },
    //     ]
    //     // et bien retourner le tableau photographers seulement une fois
    //     return ({
    //         photographers: [...photographers, ...photographers, ...photographers]})
    // }

    // async function displayData(photographers) {
    //     const photographersSection = document.querySelector(".photographer_section");

    //     photographers.forEach((photographer) => {
    //         const photographerModel = photographerFactory(photographer);
    //         const userCardDOM = photographerModel.getUserCardDOM();
    //         photographersSection.appendChild(userCardDOM);
    //     });
    // };

    // async function init() {
    //     // Récupère les datas des photographes
    //     const { photographers } = await getPhotographers();
    //     displayData(photographers);
    // };
    
    // init();
    
    const mediaData = [];
    const photographersData = [];
    
    async function getPhotographers() {
        await fetch("./data/photographers.json")
            .then(response => response.json())
            .then(data => {
                photographersData.push(data.photographers)
                createPhotographerCard();
            })
            .catch(error => console.log(error));
            console.log(photographersData);
    }

    getPhotographers();

    function createPhotographerCard() {
        let template = "";
        const section = document.querySelector(".photographer_section");
        photographersData[0].map(item => {
            const {name,portrait,city,country,tagline,price,id} = item;
            template += `<article>
            <a href="./photographer.html/${id}">
                <img src="./assets/photographers/${portrait}" alt=${name}>
                <h2>${name}</h2>
            </a>
            <p class="location">${city}, ${country}</p>
            <p>${tagline}</p>
            <p class="price">${price}€/jour</p>
            </article>`
        });
        section.innerHTML = template;
    }


    // async function getMedia() {
    //     await fetch("../../data/photographers.json")
    //         .then(response => response.json())
    //         .then(data => mediaData.push(data.media))
    //         .catch(error => console.log(error));
    //         console.log(mediaData);
    // }

    // getMedia();

