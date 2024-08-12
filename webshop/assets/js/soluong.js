document.addEventListener('DOMContentLoaded', function() {
    const quantityDisplay = document.getElementById('quantityDisplay');
    const quantityInput = document.getElementById('soluong');
    const decreaseButton = document.getElementById('decreaseQuantity');
    const increaseButton = document.getElementById('increaseQuantity');

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
