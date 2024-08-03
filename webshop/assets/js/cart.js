// cart.js

function addMoreCart(id, quantity) {
    const num = document.getElementById(`num_${id}`);
    let currentQuantity = Number(num.value);
    currentQuantity += quantity;

    // Đảm bảo số lượng không nhỏ hơn 1
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    num.value = currentQuantity;
    updateCartTotal(id);
    updateItemCount(); // Cập nhật số lượng sản phẩm sau khi thay đổi
}

function fixCartNum(id) {
    const num = document.getElementById(`num_${id}`);
    let currentQuantity = Number(num.value);

    // Đảm bảo số lượng không nhỏ hơn 1
    if (isNaN(currentQuantity) || currentQuantity < 1) {
        currentQuantity = 1;
    }

    num.value = currentQuantity;
    updateCartTotal(id);
    updateItemCount(); // Cập nhật số lượng sản phẩm sau khi thay đổi
}

function updateCartTotal(id) {
    const priceElement = document.getElementById(`price_${id}`);
    const price = Number(priceElement.getAttribute('data-price'));
    const quantity = Number(document.getElementById(`num_${id}`).value);
    const totalPrice = price * quantity;

    document.getElementById(`total_price_${id}`).innerText = totalPrice.toLocaleString() + " VND";

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

    document.getElementById('grand_total').innerText = grandTotal.toLocaleString() + " VND";
}

function updateCart(id, quantity) {
    if (quantity === 0) {
        // Xoá sản phẩm
        const row = document.getElementById(`row_${id}`);
        if (row) {
            row.parentNode.removeChild(row);
        }
    } else {
        // Cập nhật số lượng
        addMoreCart(id, quantity);
    }

    // Cập nhật tổng tiền sau khi thay đổi
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

    console.log(`Total number of items: ${itemCount}`); // Ghi log để kiểm tra
    document.getElementById('item-count').innerText = `${itemCount} sản phẩm`;
}

// Gọi hàm updateItemCount khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded, calling updateItemCount");
    updateItemCount();
});
