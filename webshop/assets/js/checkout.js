function completeCheckout() {
    const data = {
        action: 'checkout',
        fullname: document.querySelector('[name=fullname]').value,
        email: document.querySelector('[name=email]').value,
        phone_number: document.querySelector('[name=phone]').value,
        address: document.querySelector('[name=address]').value,
        note: document.querySelector('[name=note]').value
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
