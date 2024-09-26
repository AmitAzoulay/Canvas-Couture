
// Quantity selector logic
const decreaseButton = document.getElementById('decreaseQuantity');
const increaseButton = document.getElementById('increaseQuantity');
const quantityInput = document.getElementById('quantity');
let maxStock = 15;  // Set this dynamically based on your product stock

decreaseButton.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
});

increaseButton.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity < maxStock) {
        quantityInput.value = currentQuantity + 1;
    }
});