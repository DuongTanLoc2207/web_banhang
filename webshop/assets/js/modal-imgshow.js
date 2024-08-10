document.addEventListener('DOMContentLoaded', function() {
    const imageModal = document.getElementById('imageModal');
    const imgInModal = document.getElementById('imgInModal');
    const closeImageModal = document.querySelector('.close-image-modal');
    const slideImages = document.querySelectorAll('.slide-image');
    const thumbnails = document.querySelectorAll('.img-detail');
    let currentSlideIndex = 0;

    // Cập nhật ảnh lớn khi nhấp vào ảnh nhỏ bên trái
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            currentSlideIndex = index;
            updateSlideImage();
        });
    });

    // Mở modal khi click vào ảnh lớn
    slideImages.forEach(image => {
        image.addEventListener('click', function() {
            imageModal.style.display = 'block';
            imgInModal.src = this.src;
        });
    });

    // Đóng modal khi nhấp vào dấu X
    closeImageModal.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });

    // Đóng modal khi nhấp ra ngoài ảnh
    window.addEventListener('click', function(event) {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Hàm cập nhật ảnh lớn theo chỉ số hiện tại
    function updateSlideImage() {
        slideImages.forEach((slide, index) => {
            slide.style.display = index === currentSlideIndex ? 'block' : 'none';
        });
    }

    // Khởi tạo ảnh lớn đầu tiên
    updateSlideImage();
});
