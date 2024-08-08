document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateGrandTotal(); // Cập nhật tổng tiền khi trang được tải
    setupPaymentMethodListeners(); // Thiết lập sự kiện cho phương thức thanh toán
});

function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Lọc các sản phẩm có số lượng không hợp lệ
    cartItems = cartItems.filter(item => item.quantity && !isNaN(item.quantity) && item.quantity > 0);

    const cartContainer = document.querySelector('.cart');
    
    cartContainer.innerHTML = `
    <div class="cart-item header">
        <div class="thumbnail">Sản Phẩm</div>
        <div class="title">Thông tin</div>
        <div class="price">Giá</div>
        <div class="quantity">Số Lượng</div>
        <div class="total-price">Thành Tiền</div>
    </div>
    `;

    cartItems.forEach((item, index) => {
        const cartItemHTML = `
            <div class="cart-item" id="row_${index}">
                <div class="thumbnail"><img src="${item.image}" alt="${item.name}"></div>
                <div class="title">${item.name} <br> Size: ${item.size}</div>
                <div class="price" id="price_${index}" data-price="${item.price}">${item.price.toLocaleString()} đ</div>
                <div class="quantity">
                    <input type="text" readonly id="num_${index}" value="${item.quantity}" class="form-control">
                </div>
                <div class="total-price" id="total_price_${index}">${(item.price * item.quantity).toLocaleString()} đ</div>
            </div>
        `;

        cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    // Cập nhật lại localStorage sau khi loại bỏ các sản phẩm không hợp lệ
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateGrandTotal(); // Cập nhật tổng tiền của giỏ hàng
}



function updateGrandTotal() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Lọc các sản phẩm có số lượng không hợp lệ
    cartItems = cartItems.filter(item => item.quantity && !isNaN(item.quantity) && item.quantity > 0);

    const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('grand_total').innerText = grandTotal.toLocaleString() + ' đ';
}



function completeCheckout() {
    const fullname = document.querySelector('[name=fullname]').value.trim();
    const email = document.querySelector('[name=email]').value.trim();
    const phone = document.querySelector('[name=phone]').value.trim();
    const address = document.querySelector('[name=address]').value.trim();
    const addressPay = document.querySelector('[name=addressPay]').value.trim();
    const selectedPaymentMethod = document.querySelector('input[name="payment_method_id"]:checked');

    // Xóa thông báo lỗi cũ
    document.getElementById('fullnameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('phoneError').innerText = '';
    document.getElementById('addressError').innerText = '';
    document.getElementById('addressPayError').innerText = '';
    document.getElementById('paymentMethodError').innerText = '';

    let valid = true;

    // Kiểm tra các trường thông tin
    if (!fullname) {
        document.getElementById('fullnameError').innerText = 'Vui lòng điền đầy đủ họ và tên.';
        valid = false;
    }
    if (!email) {
        document.getElementById('emailError').innerText = 'Vui lòng điền đầy đủ email.';
        valid = false;
    }
    if (!phone) {
        document.getElementById('phoneError').innerText = 'Vui lòng điền đầy đủ số điện thoại.';
        valid = false;
    } else if (!/^\d{8,12}$/.test(phone)) {
        document.getElementById('phoneError').innerText = 'Số điện thoại phải là số và có độ dài từ 8 đến 12 ký tự.';
        valid = false;
    }
    if (!address) {
        document.getElementById('addressError').innerText = 'Vui lòng điền đầy đủ địa chỉ.';
        valid = false;
    }
    if (!addressPay) {
        document.getElementById('addressPayError').innerText = 'Vui lòng điền đầy đủ địa chỉ.';
        valid = false;
    }
    if (!selectedPaymentMethod) {
        document.getElementById('paymentMethodError').innerText = 'Vui lòng chọn phương thức thanh toán.';
        valid = false;
    }

    if (!valid) {
        return false;
    }

    const data = {
        action: 'checkout',
        fullname: fullname,
        email: email,
        phone_number: phone,
        address: address,
        note: document.querySelector('[name=note]').value,
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
        // Hiển thị modal khi thanh toán thành công
        document.getElementById('successModal').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));

    return false; // Ngăn không cho form gửi đi
}



// Thêm sự kiện để đóng modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close');
    const okBtn = document.getElementById('okBtn');

    closeBtn.onclick = function() {
        modal.style.display = 'none';
        window.open('index.html', '_self');
    }

    okBtn.onclick = function() {
        modal.style.display = 'none';
        window.open('index.html', '_self');
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            // window.open('index.html', '_self');
        }
    }
});

function setupPaymentMethodListeners() {
    const paymentMethods = document.querySelectorAll('.input-radio');
    const blankSlates = document.querySelectorAll('.blank-slate');

    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            blankSlates.forEach(blankSlate => {
                blankSlate.style.display = 'none';
            });

            const selectedMethodId = method.getAttribute('id');
            const associatedBlankSlate = document.querySelector(`.content-box-row-secondary[for="${selectedMethodId}"] .blank-slate`);
            if (associatedBlankSlate) {
                associatedBlankSlate.style.display = 'block';
            }
        });
    });
}
