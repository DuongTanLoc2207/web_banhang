document.addEventListener('DOMContentLoaded', function() {
    const imageElements = document.querySelectorAll('.product-image');

    imageElements.forEach(imageElement => {
        const productName = imageElement.dataset.productName || 'Jean1'; // Lấy tên sản phẩm từ thuộc tính data-product-name của phần tử hình ảnh

        // Tạo danh sách ảnh dựa trên tên sản phẩm
        const imageSources = [
            `assets/images/${productName}.webp`, // Ảnh chính
            `assets/images/${productName}-1.webp`, // Ảnh 1
            `assets/images/${productName}-2.webp`, // Ảnh 2
            `assets/images/${productName}-3.webp`  // Ảnh 3
        ];

        let currentImageIndex = 0;
        let imageInterval;

        function startImageRotation() {
            imageInterval = setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % imageSources.length;
                imageElement.src = imageSources[currentImageIndex];
                console.log('Image changed to: ' + imageSources[currentImageIndex]); // Thông báo đường dẫn ảnh mới
            }, 1200); // 2 giây
        }

        function stopImageRotation() {
            clearInterval(imageInterval);
            currentImageIndex = 0; // Đặt lại chỉ số ảnh về 0
            imageElement.src = imageSources[currentImageIndex]; // Đặt lại ảnh về ảnh đầu tiên
        }

        imageElement.addEventListener('mouseover', startImageRotation);
        imageElement.addEventListener('mouseout', stopImageRotation);

        // Kiểm tra nếu ảnh ban đầu được tải đúng cách
        imageElement.onload = () => console.log('Initial image loaded successfully.');
        imageElement.onerror = () => console.error('Error loading image: ' + imageElement.src);
    });

    const productContainers = document.querySelectorAll('.jean_product');
    productContainers.forEach(container => {
        container.addEventListener('mouseover', () => {
            container.querySelector('.cart-eye').style.display = 'flex';
        });

        container.addEventListener('mouseout', () => {
            container.querySelector('.cart-eye').style.display = 'none';
        });
    });
});
