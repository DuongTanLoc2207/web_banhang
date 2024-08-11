document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateGrandTotal(); // Cập nhật tổng tiền khi trang được tải
    setupPaymentMethodListeners(); // Thiết lập sự kiện cho phương thức thanh toán
    setupValidationListeners(); // Thiết lập sự kiện để kiểm tra và xóa thông báo lỗi
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
                <div class="title">${item.name} <br> <span class = "MaSP"> Mã sản phẩm: ${item.id}</span> <br> Size: ${item.size}</div>
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

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    let shippingFee = 0;

    // Cộng thêm phí vận chuyển nếu tổng đơn hàng dưới 399.000 VNĐ
    if (subtotal < 399000) {
        shippingFee = 30000;
    }

    const grandTotal = subtotal + shippingFee;
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
    clearErrors();

    let valid = true;

    // Kiểm tra các trường thông tin
    if (!fullname) {
        document.getElementById('fullnameError').innerText = 'Vui lòng điền họ và tên của bạn.';
        valid = false;
    }
    if (!email) {
        document.getElementById('emailError').innerText = 'Vui lòng điền email của bạn.';
        valid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').innerText = 'Địa chỉ email phải có dạng username@domain.extension.';
        valid = false;
    }
    if (!phone) {
        document.getElementById('phoneError').innerText = 'Vui lòng điền số điện thoại của bạn.';
        valid = false;
    } else if (!/^\d{8,12}$/.test(phone)) {
        document.getElementById('phoneError').innerText = 'Số điện thoại phải là số và có độ dài từ 8 đến 12 ký tự.';
        valid = false;
    }
    if (!address) {
        document.getElementById('addressError').innerText = 'Vui lòng điền địa chỉ nhận hàng.';
        valid = false;
    }
    if (!addressPay) {
        document.getElementById('addressPayError').innerText = 'Vui lòng điền địa chỉ thanh toán.';
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

        // Xóa tất cả sản phẩm trong localStorage
        localStorage.removeItem('cartItems');
    })
    .catch(error => console.error('Error:', error));

    return false; // Ngăn không cho form gửi đi
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

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

function setupValidationListeners() {
    document.querySelector('[name=fullname]').addEventListener('input', () => {
        document.getElementById('fullnameError').innerText = '';
    });

    document.querySelector('[name=email]').addEventListener('input', () => {
        document.getElementById('emailError').innerText = '';
    });

    document.querySelector('[name=phone]').addEventListener('input', () => {
        document.getElementById('phoneError').innerText = '';
    });

    document.querySelector('[name=address]').addEventListener('input', () => {
        document.getElementById('addressError').innerText = '';
    });

    document.querySelector('[name=addressPay]').addEventListener('input', () => {
        document.getElementById('addressPayError').innerText = '';
    });

    document.querySelectorAll('input[name="payment_method_id"]').forEach(input => {
        input.addEventListener('change', () => {
            document.getElementById('paymentMethodError').innerText = '';
        });
    });
}

function clearErrors() {
    document.getElementById('fullnameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('phoneError').innerText = '';
    document.getElementById('addressError').innerText = '';
    document.getElementById('addressPayError').innerText = '';
    document.getElementById('paymentMethodError').innerText = '';
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
            window.open('index.html', '_self');
        }
    }

    // Kiểm tra giỏ hàng
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        // Nếu không có sản phẩm trong giỏ hàng, chuyển hướng đến trang giỏ hàng hoặc trang chính
        window.location.href = 'cart.html'; // Hoặc 'index.html' nếu bạn muốn quay về trang chính
    }
});
