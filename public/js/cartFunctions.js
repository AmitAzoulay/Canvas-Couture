async function removeFromCart(orderId, productId) {
    try {
        const response = await fetch(`/order/remove/${orderId}/${productId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Successfully removed the item, refresh the page or update the UI
            window.location.reload(); // Refresh the page to show updated cart
        } else {
            console.error('Failed to remove item from cart');
            alert('Failed to remove item from cart');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addToCart(productId, quantity) {
    try {
        const response = await fetch(`/order/add/${productId}/${quantity}`, {
            method: 'POST',
        });

        if (response.ok) {
            // Successfully added the item, refresh the page or update the UI
            window.location.reload(); // Refresh the page to show updated cart
        } else {
            console.error('Failed to add item to cart');
            alert('Failed to add item to cart');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}