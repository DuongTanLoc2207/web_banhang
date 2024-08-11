document.addEventListener('DOMContentLoaded', function() {
    function setupSlideshow(modal) {
        const slides = modal.querySelectorAll('.slide-image');
        const thumbnails = modal.querySelectorAll('.img-detail');
        const sizeButtons = modal.querySelectorAll('.size-button');
        let currentSlide = 0;
        let currentThumbnail = null;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.opacity = i === index ? '1' : '0';
            });

            if (currentThumbnail) {
                currentThumbnail.classList.remove('selected');
            }

            if (thumbnails[index]) { // Kiểm tra xem thumbnail có tồn tại không
                thumbnails[index].classList.add('selected');
                currentThumbnail = thumbnails[index];
            } else {
                console.error(`Thumbnail at index ${index} does not exist.`);
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Đăng ký sự kiện cho các nút next và prev
        modal.querySelector('.prev-modal').addEventListener('click', nextSlide);
        modal.querySelector('.next-modal').addEventListener('click', prevSlide);

        showSlide(currentSlide);

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function() {
                if (currentThumbnail) {
                    currentThumbnail.classList.remove('selected');
                }
                thumbnail.classList.add('selected');
                currentThumbnail = thumbnail;
                currentSlide = index;
                showSlide(index);
            });
        });

        sizeButtons.forEach(button => {
            button.addEventListener('click', handleSizeButtonClick);
        });

        function handleSizeButtonClick(event) {
            const selectedButton = event.currentTarget;
            sizeButtons.forEach(button => {
                button.classList.remove('selected');
            });
            selectedButton.classList.add('selected');
            selectSize(selectedButton.getAttribute('data-size'));
        }

        function selectSize(size) {
            modal.querySelectorAll('.selected-size').forEach(element => {
                element.textContent = size;
            });
        }

        // Chọn kích thước mặc định nếu có
        const defaultSize = modal.querySelector('.size-button[data-size="29"]') || modal.querySelector('.size-button[data-size="M"]');
        if (defaultSize) {
            defaultSize.click();
        }
    }

    // Hàm mở modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show'); // Thêm lớp 'show' để kích hoạt hiệu ứng
            }, 10); // Sử dụng setTimeout để đảm bảo rằng thuộc tính display đã được áp dụng trước khi thêm lớp 'show'
            setupSlideshow(modal); // Setup slideshow khi modal mở
        } else {
            console.error(`Modal with id ${modalId} not found.`);
        }
    }

    // Hàm đóng modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show'); // Loại bỏ lớp 'show' để ẩn hiệu ứng
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500); // Chờ thời gian hiệu ứng kết thúc trước khi ẩn modal hoàn toàn
        } else {
            console.error(`Modal with id ${modalId} not found.`);
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
            const modalId = this.closest('.container-modal-product').id;
            closeModal(modalId);
        });
    });

    // Đóng modal khi nhấp ra ngoài
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('container-modal-product')) {
            closeModal(event.target.id);
        }
    });

    // Đăng ký sự kiện cho nút thêm vào giỏ hàng trong modal
    document.querySelectorAll('.modal-addcart').forEach(button => {
        button.addEventListener('click', function() {
            const modal = button.closest('.container-modal');
            const productElement = modal.querySelector('.container-modal-noidung');
            const product = {
                id: productElement.getAttribute('data-id'),
                name: productElement.getAttribute('data-name'),
                price: parseInt(productElement.getAttribute('data-price')),
                size: modal.querySelector('.size-button.selected')?.getAttribute('data-size'),
                quantity: parseInt(modal.querySelector('.modal-so').value),
                image: productElement.getAttribute('data-image')
            };

            if (!product.size) {
                alert('Vui lòng chọn size!');
                return;
            }

            addToCart(product);
            showSuccessModal();
        });
    });

    function addToCart(product) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const existingItemIndex = cartItems.findIndex(item => item.id === product.id && item.size === product.size);
        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += product.quantity;
        } else {
            cartItems.push(product);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function showSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'block';
        
        document.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        document.getElementById('okBtn').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});
