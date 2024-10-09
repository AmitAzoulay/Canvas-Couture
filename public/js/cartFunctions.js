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
            // Remove the item from the cart in the UI
            $(`#item-${productId}`).remove();

            // Update the total amount
            let totalAmount = 0;
            $('.item-price').each(function () {
                const price = parseFloat($(this).text());
                const quantity = parseFloat($(this).closest('tr').find('.item-quantity').text());
                totalAmount += price * quantity;
            });

            // If the total amount is 0 or the cart is empty, reload the cart page
            if (totalAmount === 0 || $('.item-price').length === 0) {
                window.location.reload(); // Reload the page to refresh the cart
            } else {
                // Update the displayed total amount if there are still items in the cart
                $('.total h2').text(`Total Amount: $${totalAmount.toFixed(2)}`);
            }
            alert('Remove from cart successfully!');
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