document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateItemCount();
});

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector('.cart');
    const emptyCartContainer = document.querySelector('.cart-empty');

    // Xóa tất cả các item hiện có trong giỏ hàng
    cartContainer.innerHTML = `
        <div class="cart-item header">
            <!-- <div class="stt">STT</div> -->
            <div class="thumbnail">Sản phẩm</div>
            <div class="title">Thông Tin</div>
            <div class="price">Giá</div>
            <div class="quantity">Số Lượng</div>
            <div class="total-price">Thành Tiền</div>
            <div class="actions"></div>
        </div>
    `;

    if (cartItems.length === 0) {
        // Hiển thị phần giỏ hàng trống
        cartContainer.style.display = 'none';
        emptyCartContainer.style.display = 'block';
    } else {
        // Ẩn phần giỏ hàng trống
        emptyCartContainer.style.display = 'none';
        cartContainer.style.display = 'block';

        cartItems.forEach((item, index) => {
            // Check if item has all necessary properties
            if (!item.image || !item.name || !item.price || !item.size || !item.quantity) {
                console.error(`Item at index ${index} is missing properties:`, item);
                return;
            }

            const cartItemHTML = `
                <div class="cart-item" id="row_${index}">
                    <div class="thumbnail"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="title">${item.name} <br> <span class = "MaSP"> Mã sản phẩm: ${item.id}</span> <br>  Size: ${item.size}</div>
                    <div class="price" id="price_${index}" data-price="${item.price}">${item.price.toLocaleString()} đ</div>
                    <div class="quantity">
                        <button class="btn btn-light" onclick="addMoreCart(${index}, -1)">-</button>
                        <input type="text" id="num_${index}" value="${item.quantity}" class="form-control" onchange="fixCartNum(${index})">
                        <button class="btn btn-light" onclick="addMoreCart(${index}, 1)">+</button>
                    </div>
                    <div class="total-price" id="total_price_${index}">${(item.price * item.quantity).toLocaleString()} đ</div>
                    <div class="actions"><button class="btn btn-danger" onclick="updateCart(${index}, 0)">Xoá</button></div>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        updateGrandTotal();
    }

    updateItemCount();
}

function addMoreCart(id, quantity) {
    const num = document.getElementById(`num_${id}`);
    let currentQuantity = Number(num.value);
    currentQuantity += quantity;

    // Đảm bảo số lượng không nhỏ hơn 1
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    num.value = currentQuantity;
    updateCartItem(id, currentQuantity);
}

function fixCartNum(id) {
    const num = document.getElementById(`num_${id}`);
    let currentQuantity = Number(num.value);

    // Đảm bảo số lượng không nhỏ hơn 1
    if (isNaN(currentQuantity) || currentQuantity < 1) {
        currentQuantity = 1;
    }

    num.value = currentQuantity;
    updateCartItem(id, currentQuantity);
}

function updateCartItem(id, quantity) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems[id]) {
        cartItems[id].quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    updateCartTotal(id);
    updateItemCount();
}

function updateCartTotal(id) {
    const priceElement = document.getElementById(`price_${id}`);
    const price = Number(priceElement.getAttribute('data-price'));
    const quantity = Number(document.getElementById(`num_${id}`).value);
    const totalPrice = price * quantity;

    document.getElementById(`total_price_${id}`).innerText = totalPrice.toLocaleString() + " đ";

    // Cập nhật tổng tiền của tất cả các sản phẩm
    updateGrandTotal();
}

function updateGrandTotal() {
    let grandTotal = 0;
    const totalElements = document.querySelectorAll('.total-price');

    totalElements.forEach(element => {
        const totalPrice = Number(element.innerText.replace(/[^0-9]/g, ''));
        if (!isNaN(totalPrice)) {
            grandTotal += totalPrice;
        }
    });

    document.getElementById('grand_total').innerText = grandTotal.toLocaleString() + " đ";
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

function updateCart(id, quantity) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (quantity === 0) {
        // Lấy ID và size của sản phẩm cần xóa
        const item = cartItems[id];
        const itemId = item.id;
        const itemSize = item.size;

        // Xóa sản phẩm bằng cách gọi hàm từ modal cart
        removeCartItem(itemId, itemSize);

        // Cập nhật giao diện giỏ hàng
        loadCartItems();
    } else {
        // Cập nhật số lượng sản phẩm
        cartItems[id].quantity += quantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        updateCartTotal(id);
        updateItemCount();
    }
}

function updateItemCount() {
    let itemCount = 0;
    const quantityInputs = document.querySelectorAll('.cart-item:not(.header) .form-control');

    // Tính tổng số lượng sản phẩm
    quantityInputs.forEach(input => {
        itemCount += Number(input.value);
    });

    document.getElementById('item-count').innerText = `${itemCount} sản phẩm`;
}
