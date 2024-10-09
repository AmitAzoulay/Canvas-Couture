$(document).ready(function () {
    // Handle the Proceed to Payment button click
    $('#proceed-payment').on('click', function () {
        window.location.href = '/payment';
    });

    // Handle Back to Shop button click
    $('#back-to-shop').on('click', function () {
        window.location.replace('http://localhost:3000/products/search/all');
    });
});

// Define your jQuery functions for addToCart and removeFromCart
function removeFromCart(orderId, productId) {
    console.log(`Removing item: Order ID = ${orderId}, Product ID = ${productId}`); // Log values

    $.ajax({
        url: `/order/remove/${orderId}/${productId}`,
        type: 'DELETE', // Use DELETE method
        data: JSON.stringify({ orderId: orderId, productId: productId, action: 'decrease' }), // Pass the action
        contentType: 'application/json', // Set content type to JSON
        success: function (response) {
            console.log('Response:', response); // Log response

            // Get the current quantity from the UI
            const itemQuantityElem = $('#item-' + productId).find('.item-quantity');
            let currentQuantity = parseInt(itemQuantityElem.text());

            if (currentQuantity > 1) {
                // Decrease the quantity by 1
                itemQuantityElem.text(currentQuantity - 1);
            } else {
                // Remove the item if quantity reaches 0
                $('#item-' + productId).remove();
            }

            updateTotalAmount();
            alert('Removed from cart successfully!');
        },
        error: function (err) {
            console.error('AJAX Error:', err); // Log the error
            alert('Error removing item from cart');
        }
    });
}
function addToCart(productId, quantity) {
    // Implement the AJAX request to add the item to the cart
    $.ajax({
        url: `/order/add/${productId}/${quantity}`, // Adjust URL based on your backend route
        type: 'POST',
        data: { productId: productId, quantity: quantity },
        success: function (response) {

            // Handle the success response (e.g., update quantity in the UI)
            const itemRow = $('#item-' + productId);
            const currentQuantity = itemRow.find('.item-quantity').text();
            itemRow.find('.item-quantity').text(parseInt(currentQuantity) + quantity);
            updateTotalAmount();
            alert('Added to cart successfully!');
        },
        error: function (err) {
            console.error(err);
            alert('Error adding item to cart');
        }
    });
}

function updateTotalAmount() {
    let total = 0;
    $('tbody tr').each(function () {
        const price = parseFloat($(this).find('.item-price').text());
        const quantity = parseInt($(this).find('.item-quantity').text());
        total += price * quantity;
    });
    $('.total h2').text('Total Amount: $' + total.toFixed(2));
}