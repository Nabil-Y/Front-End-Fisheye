function createModalEvents() {
    document.getElementById("openModal").addEventListener("click", openModal);
    document.getElementById("closeModal").addEventListener("click", closeModal);

    document.getElementById("contact-form").addEventListener("submit", (event) => {
        event.preventDefault();
        document.querySelectorAll(".input").forEach(input => console.log(input.value) );
    })
}

function completeModalTitleAndRoles() {
    document.getElementById("contact-title").innerText = `Contactez-moi\r ${photographerData[0].name}`;
    document.getElementById("contact_modal").setAttribute("aria-labelledby", "contact-title")
}

function openModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    modal.setAttribute("aria-hidden", "false");
    document.querySelector("header").setAttribute("aria-hidden", "true");
    document.querySelector("main").setAttribute("aria-hidden", "true");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    modal.setAttribute("aria-hidden", "true");
    document.querySelector("header").setAttribute("aria-hidden", "false");
    document.querySelector("main").setAttribute("aria-hidden", "false");
}

function completeModal() {
    createModalEvents();
    completeModalTitleAndRoles();
}