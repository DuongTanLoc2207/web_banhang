function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pwd').value;
    var errorMsg = document.getElementById('msg');

    if (email === '' || password === '') {
        errorMsg.textContent = 'Email và mật khẩu không được để trống';
        return false;
    }
    if (password.length < 6) {
        errorMsg.textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
        return false;
    }
    errorMsg.textContent = '';
    return true;
}
