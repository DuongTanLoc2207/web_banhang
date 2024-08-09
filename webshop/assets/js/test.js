// Hàm mở modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Hàm đóng modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Đăng ký sự kiện cho các nút giỏ hàng
document.querySelectorAll('.bi-cart-plus-fill').forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        openModal(modalId);
    });
});

// Đóng modal khi nhấp vào dấu X
document.querySelectorAll('.close-modal').forEach(span => {
    span.addEventListener('click', function() {
        const modalId = this.parentElement.parentElement.parentElement.id;
        closeModal(modalId);
    });
});

// Đóng modal khi nhấp ra ngoài
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('container-modal-product')) {
        event.target.style.display = 'none';
    }
});
