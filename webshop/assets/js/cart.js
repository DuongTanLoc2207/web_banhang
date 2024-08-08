document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateItemCount();
});

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector('.cart');

    cartItems.forEach((item, index) => {
        // Check if item has all necessary properties
        if (!item.image || !item.name || !item.price || !item.size || !item.quantity) {
            console.error(`Item at index ${index} is missing properties:`, item);
            return;
        }

        const cartItemHTML = `
            <div class="cart-item" id="row_${index}">
                <div class="thumbnail"><img src="${item.image}" alt="${item.name}"></div>
                <div class="title">${item.name} <br> Size: ${item.size}</div>
                <div class="price" id="price_${index}" data-price="${item.price}">${item.price.toLocaleString()} đ</div>
                <div class="quantity">
                    <button class="btn btn-light" onclick="addMoreCart(${index}, -1)">-</button>
                    <input type="text" readonly id="num_${index}" value="${item.quantity}" class="form-control" onchange="fixCartNum(${index})">
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
    updateItemCount(); // Cập nhật số lượng sản phẩm sau khi thay đổi
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

function updateCart(id, quantity) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (quantity === 0) {
        // Xoá sản phẩm
        const row = document.getElementById(`row_${id}`);
        if (row) {
            row.parentNode.removeChild(row);
        }
        cartItems.splice(id, 1);
    } else {
        // Cập nhật số lượng
        cartItems[id].quantity += quantity;
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateGrandTotal();
    updateItemCount(); // Cập nhật số lượng sản phẩm sau khi thay đổi
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
