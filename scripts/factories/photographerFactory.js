/**
 * PhotographerFactory to create HTML card with JSON data
 */
class PhotographerFactory {
    /**
     * Object collected from JSON
     * @param {Object} data 
     */
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
    }

    /**
     * Create photographer card innerHTML for home Page
     * @returns string with innerHTML 
     */
    createHomeHTML() {
        return `<article>
        <a href="./photographer.html?id=${this.id}" aria-label="${this.name}">
            <img src="./assets/photographers/${this.portrait}" alt="${this.name} profile picture">
            <h2>${this.name}</h2>
        </a>
        <div tabindex="0">
            <p class="location">${this.city}, ${this.country}</p>
            <p>${this.tagline}</p>
            <p class="price">${this.price}€/jour</p>
        </div>
        </article>`
    }

    /**
     * Photographer card innerHTML for profile Page
     * @returns string with innerHTML
     */
    createProfileHTML() {
        return `
        <div>
            <h1 tabindex="0">${this.name}</h1>
            <div tabindex="0">
                <h2 >${this.city}, ${this.country}</h2>
                <p>${this.tagline}</p>
            </div>
        </div>
        <button class="contact_button" id="openModal" aria-label="Contact me">Contactez-moi</button>
        <div id="photographerImage">
            <img tabindex="0" src="./assets/photographers/${this.portrait}" alt="${this.name} profile picture">
        </div>
        `
    }
}

/**
 * MediaFactory to create HTML img or video with JSON data
 */
class MediaFactory {
    /**
     * Object collected from JSON
     * @param {Object} data 
     */
    constructor(data) {
        if (data.image) {
            return new Image(data);
        } else {
            return new Video(data);
        }
    }
}   

/**
 * Image class to create HTML when receiving img data in JSON
 */
class Image {
    /**
     * Object collected from JSON
     * @param {Object} data 
     */
    constructor(data) {
        this.title= data.title;
        this.src = data.image;
        this.likes = data.likes;
        this.date = data.date;
        this.photographerId = data.photographerId;
    }
    
    /**
     * Image innerHTML for profile page
     * @returns string with innerHTML
     */
    createHTML() {
        return `
        <article class="card" data-date="${this.date}" data-title="${this.title}" data-likes=${this.likes}>
        <a tabindex="0" class="media-link"><img class="media" aria-label="${this.title}" src="./assets/images/${getPhotographerName(this.photographerId)}/${this.src}" alt="${this.title}" /></a>
        <div class="gallery-info">
        <h2 tabindex="0">${this.title}</h2>
        <div tabindex="0" role="button" class="likes" data-liked="false">${this.likes} <i aria-label="likes" class="fa-regular fa-heart"></i></div>
        </div>
        </article>
        `
    }
}

/**
 * Video class to create HTML when receiving video data in JSON
 */
class Video {
    /**
     * Object collected from JSON
     * @param {Object} data 
     */
    constructor(data) {
        this.title= data.title;
        this.src = data.video;
        this.likes = data.likes;
        this.date = data.date;
        this.photographerId = data.photographerId;
    }

    /**
     * Video innerHTML for profile page
     * @returns string with innerHTML
     */
    createHTML() {
        return `
        <article class="card" data-date="${this.date}" data-title="${this.title}" data-likes=${this.likes}>
        <a tabindex="0" class="media-link paused-video"><video class="media" aria-label="${this.title}" title="${this.title}" src="./assets/images/${getPhotographerName(this.photographerId)}/${this.src}" loop ></video></a>
        <div class="gallery-info">
        <h2 tabindex="0">${this.title}</h2>
        <div tabindex="0" role="button" class="likes" data-liked="false">${this.likes} <i aria-label="likes" class="fa-regular fa-heart"></i></div>
        </div>
        </article>
        `
    }
}

/**
 * @param {number} id 
 * @returns string with photographer full name corresponding to id  
 */
const getPhotographerName = (id) => {
    switch(id) {
        case 243:
        return "Mimi_Keel";
        break;
        case 930:
        return "Ellie-Rose_Wilkens";
        break;
        case 82:
        return "Tracy_Galindo";
        break;
        case 527:
        return "Nabeel_Bradford";
        break;
        case 925:
        return "Rhode_Dubois";
        break;
        case 195:
        return "Marcel_Nikolic";
        break;
        default:
        return "Error: Wrong ID";
        break;
    }
}

