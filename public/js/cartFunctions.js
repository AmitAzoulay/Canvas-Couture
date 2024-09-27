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