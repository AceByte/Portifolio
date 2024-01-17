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

// Example usage when an image input is selected by the user
const imageInput = document.getElementById('your-image-input');

imageInput.addEventListener('change', (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
        compressImage(selectedImage, (compressedImage) => {
            // Handle the compressed image, for example, by displaying it
            const compressedImageUrl = URL.createObjectURL(compressedImage);
            const imgElement = document.createElement('img');
            imgElement.src = compressedImageUrl;
            // Append the imgElement to the DOM as needed
        });
    }
});

function goToGallery() {
    window.location.href = 'gallery.html';
}
