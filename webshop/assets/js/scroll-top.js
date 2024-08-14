// Lấy nút
var scrollTopBtn = document.getElementById("scrollTopBtn");

// Khi người dùng cuộn xuống 20px từ đầu trang, hiển thị nút
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
};

// Khi người dùng nhấp vào nút, cuộn lên đầu trang
scrollTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
