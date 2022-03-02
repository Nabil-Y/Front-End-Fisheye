
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

    createHTML() {
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
        <article class="card">
        <img src="./assets/images/${getPhotographerName(this.photographerId)}/${this.src}" />
        <div class="gallery-info">
        <h3>${this.title}</h3>
        <div>${this.likes}</div>
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
        <article class="card">
        <video src="./assets/images/${getPhotographerName(this.photographerId)}/${this.src}" controls ></video>
        <div class="gallery-info">
        <h3>${this.title}</h3>
        <div>${this.likes}</div>
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