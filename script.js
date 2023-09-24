// Function to enlarge the image
function enlargeImage(imageSrc) {
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalContent = document.createElement("img");
    modalContent.className = "modal-content";
    modalContent.src = imageSrc;

    modalContent.onclick = closeModal; // Allow clicking outside the image to close

    const closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = closeModal;

    modal.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    // Display the modal
    modal.style.display = "block";

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
        document.body.removeChild(modal);
    }
}

// Disable right-click context menu for images
document.addEventListener('contextmenu', (e) => {
    const target = e.target;
    if (target.tagName === 'IMG') {
        e.preventDefault();
    }
});
