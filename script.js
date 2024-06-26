// Function to enlarge the image
function enlargeImage(imageSrc) {
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalContent = document.createElement("img");
    modalContent.className = "modal-content";
    modalContent.src = imageSrc;

    modalContent.onclick = closeModal; // Allow clicking on the image to close

    const closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = closeModal;

    modal.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    // Display the modal
    modal.style.display = "block";

    // Add class to disable scrolling
    document.body.classList.add('enlarged');

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
        document.body.removeChild(modal);

        // Remove class to enable scrolling
        document.body.classList.remove('enlarged');
    }

    // Close modal on clicking anywhere outside the image
    modal.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Close modal on pressing the "Escape" key
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

// Disable right-click context menu for images
document.addEventListener('contextmenu', (e) => {
    const target = e.target;
    if (target.tagName === 'IMG') {
        e.preventDefault();
    }
});

function compressImage(file, callback) {
    const options = {
        quality: 0.6, // Adjust the quality as needed (0.1 to 1)
        maxWidth: 800, // Maximum width of the compressed image
        maxHeight: 800, // Maximum height of the compressed image
    };

    new ImageCompressor(file, {
        ...options,
        success(result) {
            // Handle the compressed image (result) here
            callback(result);
        },
        error(e) {
            console.error(e.message);
        },
    });
}

function goToGallery() {
    window.location.href = 'gallery.html';
}