const addModalEvents = () => {
    document.getElementById("openModal").addEventListener("click", openModal);
    document.getElementById("closeModal").addEventListener("click", closeModal);

    document.getElementById("contact-form").addEventListener("submit", (event) => {
        event.preventDefault();
        document.querySelectorAll(".input").forEach(input => console.log(input.value) );
        closeModal();
    })
}

const openModal = () => {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    modal.setAttribute("aria-hidden", "false");
    document.querySelector("header").setAttribute("aria-hidden", "true");
    document.querySelector("main").setAttribute("aria-hidden", "true");
}

const closeModal = () => {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    modal.setAttribute("aria-hidden", "true");
    document.querySelector("header").setAttribute("aria-hidden", "false");
    document.querySelector("main").setAttribute("aria-hidden", "false");
}