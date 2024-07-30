function validateForm() {
    var pwd = document.getElementById('pwd').value;
    var confirmPwd = document.getElementById('confirmation_pwd').value;
    if(pwd != confirmPwd) {
        alert("Mật khẩu không khớp, vui lòng kiểm tra lại");
        return false;
    }
    return true;
}
