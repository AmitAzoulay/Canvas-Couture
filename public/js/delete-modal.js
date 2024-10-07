
document.getElementById('confirmDelete').addEventListener('click', function() {
    const productId = document.getElementById('delete_product_id').value; // Get the product ID from hidden input
    
    // Send DELETE request to the server
    fetch(`/admin/products/delete`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId }) // Send product ID in the request body
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the JSON response
        } else {
            throw new Error('Failed to delete product');
        }
    })
    .then(data => {
        if (data.success) {
            alert("Product deleted successfully");
            // Find the row in the table and remove it
            const row = document.querySelector(`button[data-id="${productId}"]`).closest('tr');
            if (row) {
                row.remove(); // Remove the row from the table
            }
            // Hide the modal
            const deleteProductModal = bootstrap.Modal.getInstance(document.getElementById('deleteProductModal'));
            deleteProductModal.hide();
        } else {
            alert("Failed to delete product");
        }
    })
    .catch(error => {
        alert(error.message); // Show error message if something goes wrong
    });
});

