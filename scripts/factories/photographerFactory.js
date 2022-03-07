
class PhotographerFactory {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
    }

    createHomeHTML() {
        return `<article>
        <a href="./photographer.html?id=${this.id}">
            <img src="./assets/photographers/${this.portrait}" alt=${this.name}>
            <h2>${this.name}</h2>
        </a>
        <p class="location">${this.city}, ${this.country}</p>
        <p>${this.tagline}</p>
        <p class="price">${this.price}€/jour</p>
        </article>`
    }

    createProfileHTML() {
        return `<div>
        <h1>${this.name}</h1>
        <p>${this.city}, ${this.country}</p>
        <p>${this.tagline}</p>
        </div>
        <button class="contact_button" id="openModal">Contactez-moi</button>
        <div id="photographerImage">
            <img src="./assets/photographers/${this.portrait}" alt="${this.name}">
        </div>
        `
    }
}


class MediaFactory {
    constructor(data) {
        if (data.image) {
            return new Image(data);
        } else {
            return new Video(data);
        }
    }
}   

class Image {
    constructor(data) {
        this.title= data.title;
        this.src = data.image;
        this.likes = data.likes;
        this.date = data.date;
        this.photographerId = data.photographerId;
    }
    
    createHTML() {
        return `
        <article class="card" data-date="${this.date}" data-title="${this.title}" data-likes=${this.likes}>
        <img class="media" src="./assets/images/${getPhotographerName(this.photographerId)}/${this.src}" alt="${this.title}" />
        <div class="gallery-info">
        <h3>${this.title}</h3>
        <div class="likes" data-liked="false">${this.likes} <i class="fa-regular fa-heart"></i></div>
        </div>
        </article>
        `
    }
}


class Video {
    constructor(data) {
        this.title= data.title;
        this.src = data.video;
        this.likes = data.likes;
        this.date = data.date;
        this.photographerId = data.photographerId;
    }

    createHTML() {
        return `
        <article class="card unplayed-video" data-date="${this.date}" data-title="${this.title}" data-likes=${this.likes}>
        <video class="media" title="${this.title}" src="./assets/images/${getPhotographerName(this.photographerId)}/${this.src}" loop ></video>
        <div class="gallery-info">
        <h3>${this.title}</h3>
        <div class="likes" data-liked="false">${this.likes} <i class="fa-regular fa-heart"></i></div>
        </div>
        </article>
        `
    }
}

function getPhotographerName(id) {
    switch(id) {
        case 243:
        return "Mimi Keel";
        break;
        case 930:
        return "Ellie-Rose Wilkens";
        break;
        case 82:
        return "Tracy Galindo";
        break;
        case 527:
        return "Nabeel Bradford";
        break;
        case 925:
        return "Rhode Dubois";
        break;
        case 195:
        return "Marcel Nikolic";
        break;
        default:
        return "Error: Wrong ID";
        break;
    }
}