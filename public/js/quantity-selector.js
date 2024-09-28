
// Quantity selector logic
// Get the maxStock value from the data attribute
const productInfo = document.getElementById('productInfo');
const maxStock = parseInt(productInfo.getAttribute('data-max-stock'));
const decreaseButton = document.getElementById('decreaseQuantity');
const increaseButton = document.getElementById('increaseQuantity');
const quantityInput = document.getElementById('quantity');

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