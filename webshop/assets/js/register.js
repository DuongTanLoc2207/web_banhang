document.addEventListener('DOMContentLoaded', function() {
    var registerButton = document.querySelector('.btn'); // Nút đăng ký
    var fullnameInput = document.getElementById('usr');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('pwd');
    var confirmPwdInput = document.getElementById('confirmation_pwd');

    // Thêm sự kiện input cho các trường input để kiểm tra và cập nhật thông báo lỗi
    if (fullnameInput) {
        fullnameInput.addEventListener('input', validateForm);
    }
    if (emailInput) {
        emailInput.addEventListener('input', validateForm);
    }
    if (passwordInput) {
        passwordInput.addEventListener('input', validateForm);
    }
    if (confirmPwdInput) {
        confirmPwdInput.addEventListener('input', validateForm);
    }

    // Thêm sự kiện click cho nút Đăng Ký
    if (registerButton) {
        registerButton.addEventListener('click', function(event) {
            if (validateForm()) {
                location.reload(); 
            }
            event.preventDefault();
        });
    }

    function validateForm() {
        var fullname = fullnameInput.value;
        var email = emailInput.value;
        var password = passwordInput.value;
        var confirmPwd = confirmPwdInput.value;

        var fullnameError = document.getElementById('fullname-error');
        var emailError = document.getElementById('email-error');
        var passwordError = document.getElementById('password-error');
        var confirmationError = document.getElementById('confirmation-error');

        // Xóa thông báo lỗi trước khi kiểm tra
        fullnameError.innerHTML = '';
        emailError.innerHTML = '';
        passwordError.innerHTML = '';
        confirmationError.innerHTML = '';

        var valid = true;

        // Kiểm tra tên đầy đủ
        if (fullname === '') {
            fullnameError.innerHTML = 'Họ và tên không được để trống';
            valid = false;
        }

        // Kiểm tra định dạng email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.innerHTML = 'Email không được để trống';
            valid = false;
        } else if (!emailRegex.test(email)) {
            emailError.innerHTML = 'Email không đúng định dạng';
            valid = false;
        }

        // Kiểm tra mật khẩu
        if (password === '') {
            passwordError.innerHTML = 'Mật khẩu không được để trống';
            valid = false;
        } else if (password.length < 6) {
            passwordError.innerHTML = 'Mật khẩu phải có ít nhất 6 ký tự';
            valid = false;
        }

        // Kiểm tra xác nhận mật khẩu
        if (confirmPwd === '') {
            confirmationError.innerHTML = 'Vui lòng xác nhận mật khẩu';
            valid = false;
        } else if (password !== confirmPwd) {
            confirmationError.innerHTML = 'Mật khẩu không khớp';
            valid = false;
        }

        return valid;
    }
});
