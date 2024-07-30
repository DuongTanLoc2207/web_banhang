// cart.js

function addMoreCart(id, quantity) {
    let num = document.getElementById(`num_${id}`);
    let currentQuantity = parseInt(num.value);
    currentQuantity += quantity;

    if (currentQuantity < 1) {
        currentQuantity = 1; // Đảm bảo số lượng không nhỏ hơn 1
    }

    num.value = currentQuantity;
    updateCartTotal(id);
    updateItemCount(); // Cập nhật số lượng sản phẩm sau khi thay đổi
}

function fixCartNum(id) {
    let num = document.getElementById(`num_${id}`);
    let currentQuantity = parseInt(num.value);

    if (isNaN(currentQuantity) || currentQuantity < 1) {
        currentQuantity = 1; // Đảm bảo số lượng không nhỏ hơn 1
    }

    num.value = currentQuantity;
    updateCartTotal(id);
    updateItemCount(); // Cập nhật số lượng sản phẩm sau khi thay đổi
}

function updateCartTotal(id) {
    let priceElement = document.getElementById(`price_${id}`);
    let price = parseInt(priceElement.getAttribute('data-price'));
    let quantity = parseInt(document.getElementById(`num_${id}`).value);
    let totalPrice = price * quantity;

    document.getElementById(`total_price_${id}`).innerText = totalPrice.toLocaleString() + " VND";

    // Cập nhật tổng tiền của tất cả các sản phẩm
    updateGrandTotal();
}

function updateGrandTotal() {
    let grandTotal = 0;
    let totalElements = document.querySelectorAll('.total-price');

    totalElements.forEach(element => {
        let totalPrice = parseInt(element.innerText.replace(/[^0-9]/g, ''));
        if (!isNaN(totalPrice)) {
            grandTotal += totalPrice;
        }
    });

    document.getElementById('grand_total').innerText = grandTotal.toLocaleString() + " VND";
}

function updateCart(id, quantity) {
    if (quantity === 0) {
        // Xoá sản phẩm
        let row = document.getElementById(`row_${id}`);
        row.parentNode.removeChild(row);
    } else {
        // Cập nhật số lượng
        addMoreCart(id, quantity);
    }

    // Cập nhật tổng tiền sau khi thay đổi
    updateGrandTotal();
    updateItemCount(); // Cập nhật số lượng sản phẩm sau khi thay đổi
}

function updateItemCount() {
    let itemCount = document.querySelectorAll('.cart-item:not(.header)').length;
    console.log(`Number of items: ${itemCount}`); // Ghi log để kiểm tra
    document.getElementById('item-count').innerText = `${itemCount} sản phẩm`;
}

// Gọi hàm updateItemCount khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page loaded, calling updateItemCount");
    updateItemCount();
});
