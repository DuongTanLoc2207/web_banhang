function completeCheckout() {
    const deliveryArea = document.querySelector('input[name="delivery_area"]:checked');
    const shippingFee = deliveryArea && deliveryArea.value === 'outer_city' ? 30000 : 0;
    const data = {
        action: 'checkout',
        fullname: document.querySelector('[name=fullname]').value,
        email: document.querySelector('[name=email]').value,
        phone_number: document.querySelector('[name=phone]').value,
        address: document.querySelector('[name=address]').value,
        note: document.querySelector('[name=note]').value,
        shipping_fee: shippingFee
    };

    fetch('api/ajax_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data).toString()
    })
    .then(response => response.text())
    .then(() => {
        window.open('complete.php', '_self');
    })
    .catch(error => console.error('Error:', error));

    return false;
}

function updateShippingFee() {
    const deliveryArea = document.querySelector('input[name="delivery_area"]:checked');
    const shippingFeeElement = document.getElementById('shipping_fee');
    let shippingFee = 0;
    let shippingText = '';

    if (deliveryArea) {
        if (deliveryArea.value === 'outer_city') {
            shippingFee = 30000; // 30k
            shippingText = 'Phí vận chuyển: 30,000 VND';
        } else if (deliveryArea.value === 'inner_city') {
            shippingFee = 0;
            shippingText = ''; // Không hiển thị gì nếu nội thành
        }

        shippingFeeElement.innerText = shippingText;

        // Cập nhật tổng tiền
        updateGrandTotal(shippingFee);
    }
}

function updateGrandTotal(shippingFee = 0) {
    let grandTotal = 0;
    const totalElements = document.querySelectorAll('.total-price');

    totalElements.forEach(element => {
        const totalPrice = Number(element.innerText.replace(/[^0-9]/g, ''));
        if (!isNaN(totalPrice)) {
            grandTotal += totalPrice;
        }
    });

    grandTotal += shippingFee;
    document.getElementById('grand_total').innerText = grandTotal.toLocaleString() + " VND";
}

// Cập nhật tổng tiền khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    updateGrandTotal(); // Để đảm bảo tổng tiền ban đầu là đúng
});
