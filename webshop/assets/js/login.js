document.addEventListener('DOMContentLoaded', function() {
    var loginButton = document.getElementById('login-button');
    var guestButton = document.getElementById('guest-button');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('pwd');

    // Thêm sự kiện click cho nút Đăng Nhập
    if (loginButton) {
        loginButton.addEventListener('click', function(event) {
            if (validateForm()) {
                location.reload(); 
            }
            event.preventDefault();
        });
    }

    // Thêm sự kiện input cho các trường input để kiểm tra và cập nhật thông báo lỗi
    if (emailInput) {
        emailInput.addEventListener('input', validateForm);
    }
    if (passwordInput) {
        passwordInput.addEventListener('input', validateForm);
    }

    function validateForm() {
        var email = emailInput.value;
        var password = passwordInput.value;
        var emailError = document.getElementById('email-error');
        var passwordError = document.getElementById('password-error');

        // Xóa thông báo lỗi trước khi kiểm tra
        emailError.innerHTML = '';
        passwordError.innerHTML = '';

        var valid = true;

        // Kiểm tra định dạng email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.innerHTML = 'Email không được để trống';
            valid = false;
        } else if (!emailRegex.test(email)) {
            emailError.innerHTML = 'Email không đúng định dạng';
            valid = false;
        }

        if (password === '') {
            passwordError.innerHTML = 'Mật khẩu không được để trống';
            valid = false;
        } else if (password.length < 6) {
            passwordError.innerHTML = 'Mật khẩu phải có ít nhất 6 ký tự';
            valid = false;
        }

        return valid;
    }
});
