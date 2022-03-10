/**
 * Create events for contact from modal
 */
const addModalEvents = () => {
    document.getElementById("openModal").addEventListener("click", openModal);
    document.getElementById("closeModal").addEventListener("click", closeModal);

    document.getElementById("contact-form").addEventListener("submit", (event) => {
        event.preventDefault();
        document.querySelectorAll(".input").forEach(input => console.log(input.value) );
        closeModal();
    })
}

/**
 * Function called to open contact form modal
 */
const openModal = () => {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    hideBackgroundContent();
}

/**
 * Function called to close contact form modal
 */
const closeModal = () => {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    showBackgroundContent();
}