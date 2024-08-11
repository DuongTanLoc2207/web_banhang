document.addEventListener('DOMContentLoaded', function() {
    const imageModal = document.getElementById('imageModal');
    const imgInModal = document.getElementById('imgInModal');
    const closeImageModal = document.querySelector('.close-image-modal');
    const slideImages = document.querySelectorAll('.slide-image');
    const thumbnails = document.querySelectorAll('.img-detail');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
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
            setTimeout(() => {
                imageModal.classList.add('show'); // Thêm lớp show để kích hoạt hiệu ứng trượt xuống
            }, 10);
            imgInModal.src = this.src;
        });
    });

    // Đóng modal khi nhấp vào dấu X
    closeImageModal.addEventListener('click', function() {
        imageModal.classList.remove('show'); // Loại bỏ lớp show để kích hoạt hiệu ứng trượt lên
        setTimeout(() => {
            imageModal.style.display = 'none';
        }, 500); // Thời gian chờ tương ứng với thời gian chuyển đổi trong CSS
    });

    // Đóng modal khi nhấp ra ngoài ảnh
    window.addEventListener('click', function(event) {
        if (event.target === imageModal) {
            imageModal.classList.remove('show');
            setTimeout(() => {
                imageModal.style.display = 'none';
            }, 500);
        }
    });

    // Hàm cập nhật ảnh lớn theo chỉ số hiện tại
    function updateSlideImage() {
        slideImages.forEach((slide, index) => {
            slide.style.display = index === currentSlideIndex ? 'block' : 'none';
        });
        imgInModal.src = slideImages[currentSlideIndex].src; // Cập nhật ảnh trong modal
    }

    // Chuyển sang ảnh trước
    prevButton.addEventListener('click', function() {
        currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : slideImages.length - 1;
        updateSlideImage();
    });

    // Chuyển sang ảnh tiếp theo
    nextButton.addEventListener('click', function() {
        currentSlideIndex = (currentSlideIndex < slideImages.length - 1) ? currentSlideIndex + 1 : 0;
        updateSlideImage();
    });

    // Khởi tạo ảnh lớn đầu tiên
    updateSlideImage();
});
