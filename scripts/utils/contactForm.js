function createModalEvents() {
    document.getElementById("openModal").addEventListener("click", openModal);
    document.getElementById("closeModal").addEventListener("click", closeModal);

    document.getElementById("contact-form").addEventListener("submit", (event) => {
        event.preventDefault();
        document.querySelectorAll(".input").forEach(input => console.log(input.value) );
    })
}

function openModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
