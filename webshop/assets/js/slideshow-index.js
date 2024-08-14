let slideIndex = 1;
showSlides(slideIndex);

// Hàm để hiển thị slide hiện tại và ẩn các slide khác
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { 
        slideIndex = 1;
    }
    if (n < 1) { 
        slideIndex = slides.length;
    }

    // Ẩn tất cả các slide
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    // Xóa lớp 'active' khỏi tất cả các dot
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Hiển thị slide hiện tại
    slides[slideIndex-1].style.display = "block";  

    // Thêm lớp 'active' vào dot hiện tại
    dots[slideIndex-1].className += " active";
}

// Hàm chuyển đến slide kế tiếp
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Cài đặt sự kiện click cho các nút điều hướng
document.querySelector('.prevslide').addEventListener('click', function() {
    plusSlides(-1);
});

document.querySelector('.nextslide').addEventListener('click', function() {
    plusSlides(1);
});

// Hàm để chuyển đến slide cụ thể
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Tự động chuyển đổi slide mỗi 2 giây
setInterval(function() {
    plusSlides(1);
}, 2000);
