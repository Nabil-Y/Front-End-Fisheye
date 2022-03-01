// function photographerFactory(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }

// class MediaFactory {
//     constructor(data,type) {
//         switch(type) {
//             case "image":
//                 return new Image(data);
//             break;
//             case "video":
//                 return new Video(data);
//             break;
//             default:
//                 return console.log("Error, file type not compatible");
//             break;
//         }
//     }
// }

// class Image {
//     constructor(data) {
//         this.title= data.title;
//         this.src = data.image;
//         this.likes = data.likes;
//         this.date = data.date;
//         this.photographerId = data.photographerId;
//     }

//     get title() {
//         return this.title;
//     }

//     get likes() {
//         return this.likes;
//     }

//     get date() {
//         return this.date
//     }

//     get photographerId() {
//         getPhotographerName(this.photographerId);
//     }

//     get src() {
//         return `./assets/images/${getPhotographerName(this.photographerId)}/${this.src}`;
//     }
// }


// class Video {
//     constructor(data) {
//         this.title= data.title;
//         this.src = data.video;
//         this.likes = data.likes;
//         this.date = data.date;
//         this.photographerId = data.photographerId;
//     }

//     get title() {
//         return this.title;
//     }

//     get likes() {
//         return this.likes;
//     }

//     get date() {
//         return this.date
//     }

//     get photographerId() {
//         getPhotographerName(this.photographerId);
//     }

//     get src() {
//         return `./assets/images/${getPhotographerName(this.photographerId)}/${this.src}`;
//     }
// }

// function getPhotographerName(id) {
//     switch(id) {
//         case 243:
//         return "Mimi Keel";
//         break;
//         case 930:
//         return "Ellie-Rose Wilkens";
//         break;
//         case 82:
//         return "Tracy Galindo";
//         break;
//         case 527:
//         return "Nabeel Bradford";
//         break;
//         case 925:
//         return "Rhode Dubois";
//         break;
//         case 195:
//         return "Marcel Nikolic";
//         break;
//         default:
//         return "Error: Wrong ID";
//         break;
//     }
// }