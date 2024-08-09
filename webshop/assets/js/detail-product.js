document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide-image');
    const thumbnails = document.querySelectorAll('.img-detail');
    const sizeButtons = document.querySelectorAll('.size-button');
    let currentSlide = 0;
    let currentThumbnail = null;
    let isBuyNow = false; // Thêm biến cờ

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });

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

    // Chọn kích thước mặc định là "XS" và "29"
    const defaultSizeButtons = [
        document.querySelector('.size-button[data-size="XS"]'),
        document.querySelector('.size-button[data-size="29"]')
    ];

    defaultSizeButtons.forEach(button => {
        if (button) {
            button.click();
        }
    });

    document.getElementById('addcart').addEventListener('click', () => {
        const productElement = document.querySelector('.container_content');
        const product = {
            id: productElement.getAttribute('data-id'),
            name: productElement.getAttribute('data-name'),
            price: parseInt(productElement.getAttribute('data-price')),
            size: document.querySelector('.size-button.selected')?.getAttribute('data-size'),
            quantity: parseInt(document.getElementById('soluong').value),
            image: productElement.getAttribute('data-image')
        };

        if (!product.size) {
            alert('Vui lòng chọn size!');
            return;
        }

        addToCart(product);
        if (!isBuyNow) { // Kiểm tra biến cờ
            showSuccessModal();
        }
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

    document.getElementById('buyNowBtn').addEventListener('click', () => {
        const productElement = document.querySelector('.container_content');
        const product = {
            id: productElement.getAttribute('data-id'),
            name: productElement.getAttribute('data-name'),
            price: parseInt(productElement.getAttribute('data-price')),
            size: document.querySelector('.size-button.selected')?.getAttribute('data-size'),
            quantity: parseInt(document.getElementById('soluong').value),
            image: productElement.getAttribute('data-image')
        };

        if (!product.size) {
            alert('Vui lòng chọn size!');
            return;
        }

        isBuyNow = true; // Đặt biến cờ là true
        addToCart(product);

        // Chuyển hướng đến trang thanh toán
        window.location.href = '../checkout.html'; 
    });
});
