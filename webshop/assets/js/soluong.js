document.addEventListener('DOMContentLoaded', function() {
    const quantityDisplay = document.getElementById('modal-quantityDisplay');
    const quantityInput = document.getElementById('modal-soluong');
    const decreaseButton = document.getElementById('modal-decreaseQuantity');
    const increaseButton = document.getElementById('modal-increaseQuantity');

    let quantity = parseInt(quantityDisplay.textContent, 10);

    decreaseButton.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            quantityInput.value = quantity;
        }
    });

    increaseButton.addEventListener('click', function() {
        quantity++;
        quantityDisplay.textContent = quantity;
        quantityInput.value = quantity;
    });
});
