document.addEventListener('DOMContentLoaded', function() {
    // Chèn HTML của modal giỏ hàng vào cuối body
    const modalHTML = `
        <div class="jquery-modal blocker">
            <div class="modalAddCart " id="cart-mini-wanda">
                <div class="modal-header">Giỏ hàng</div>
                <div class="modal-content">
                    <div class="cart-view clearfix">
                        <div class="cart-scroll">
                            <table id="cart-view">
                                <tbody id="cart-items">
                                    <!-- Items will be injected here by JavaScript -->
                                </tbody>
                            </table>
                            <span class="line"></span>
                            <table class="table-total">
                                <tbody>
                                    <tr>
                                        <td class="total-price">TỔNG TIỀN: </td>
                                        <td class="text-right" id="total-price"></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a id = "link-modal" href="../cart.html" class="wanda-cart-url btn">Xem giỏ hàng</a>
                                        </td>
                                        <td>
                                            <a id = "link-modal" href="../checkout.html" class="wanda-checkout-url btn">Thanh toán</a>
                                        </td>
                                    </tr>
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </div>
                <a href="#close-modal" rel="modal:close" class="close-modal-cart">Close</a>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const totalViewCartElement = document.getElementById('total-view-cart'); 
    const cartIcon = document.querySelector('.nav-icon .ti-shopping-cart'); 
    const closeModal = document.querySelector('.close-modal-cart');
    const modal = document.querySelector('.jquery-modal.blocker'); 
    const modalContent = document.querySelector('.modal-content');

    function formatCurrency(value) {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const itemElement = document.createElement('tr');
            itemElement.classList.add('list-item');
            itemElement.innerHTML = `
                <td class="img">
                    <a href="#">
                        <img src="${item.image}" alt="${item.name}">
                    </a>
                </td>
                <td class="item">
                    <a id = "link-modal" class="pro-title-view" href="#">${item.name}</a> <br>   
                    <span>Mã sản phẩm: ${item.id}</span>
                    <span class="size-item">Size: ${item.size}</span>
                    <div class="quantity-area-cartmini">
                        <input type="button" value="–" class="qty-btn btn-left-quantity" data-id="${item.id}" data-size="${item.size}">
                        <input type="text" name="quantity_minicart" value="${item.quantity}" min="1" class="quantity-mini" readonly>
                        <input type="button" value="+" class="qty-btn btn-right-quantity" data-id="${item.id}" data-size="${item.size}">
                    </div>
                    <span class="pro-price-view">${formatCurrency(item.price)}</span>
                    <span class="remove_link remove-cart">
                        <a href="" class="remove-item" data-id="${item.id}" data-size="${item.size}"><i class="fa fa-times"></i></a>
                    </span>
                </td>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = formatCurrency(totalPrice);
        totalViewCartElement.textContent = formatCurrency(totalPrice); 
    }

    function updateCartItemQuantity(id, size, delta) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.id === id && item.size === size);

        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity += delta;

            if (cartItems[itemIndex].quantity <= 0) {
                cartItems.splice(itemIndex, 1);
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            loadCartItems();
        }
    }

    function removeCartItem(id, size) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.id === id && item.size === size);

        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            loadCartItems();
        }
    }

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-left-quantity')) {
            event.preventDefault(); 
            const id = event.target.getAttribute('data-id');
            const size = event.target.getAttribute('data-size');
            updateCartItemQuantity(id, size, -1);
        } else if (event.target.classList.contains('btn-right-quantity')) {
            event.preventDefault(); 
            const id = event.target.getAttribute('data-id');
            const size = event.target.getAttribute('data-size');
            updateCartItemQuantity(id, size, 1);
        } else if (event.target.closest('.remove-item')) {
            event.preventDefault(); 
            const id = event.target.closest('.remove-item').getAttribute('data-id');
            const size = event.target.closest('.remove-item').getAttribute('data-size');
            removeCartItem(id, size);
        }
    });

    function toggleModal() {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'block';
            loadCartItems(); // Tải lại giỏ hàng mỗi khi mở modal
        }
    }

    cartIcon.addEventListener('click', toggleModal); 
    closeModal.addEventListener('click', toggleModal); 

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    modalContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Nghe sự kiện 'cartUpdated' để tải lại giỏ hàng
    document.addEventListener('cartUpdated', loadCartItems);

    loadCartItems();
});
