document.getElementById("openModal").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);

function openModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

document.getElementById("contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelectorAll("form input").forEach(input => console.log(input.value) );
})
