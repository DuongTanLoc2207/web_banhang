document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide-image');
    const thumbnails = document.querySelectorAll('.img-detail');
    const sizeButtons = document.querySelectorAll('.size-button');
    let currentSlide = 0;
    let currentThumbnail = null;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });

        // Update the border of the corresponding thumbnail
        if (currentThumbnail) {
            currentThumbnail.classList.remove('selected');
        }
        thumbnails[index].classList.add('selected');
        currentThumbnail = thumbnails[index];
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function selectThumbnail(thumbnail, index) {
        if (currentThumbnail) {
            currentThumbnail.classList.remove('selected');
        }
        thumbnail.classList.add('selected');
        currentThumbnail = thumbnail;
        currentSlide = index;
        showSlide(index);
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            selectThumbnail(thumbnail, index);
        });
    });

    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

    showSlide(currentSlide);

    // Function to update the selected size
    function selectSize(size) {
        document.querySelectorAll('.selected-size').forEach(element => {
            element.textContent = size;
        });
    }

    function handleSizeButtonClick(event) {
        const selectedButton = event.currentTarget;
        sizeButtons.forEach(button => {
            button.classList.remove('selected');
        });
        selectedButton.classList.add('selected');
        selectSize(selectedButton.getAttribute('data-size'));
    }

    sizeButtons.forEach(button => {
        button.addEventListener('click', handleSizeButtonClick);
    });

    // Automatically select size 28
    const defaultSizeButton = document.querySelector('.size-button[data-size="28"]');
    if (defaultSizeButton) {
        defaultSizeButton.click();
    }
});
