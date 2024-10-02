
document.querySelectorAll('.delete-product').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id'); // Get the product ID
        const deleteProductModal = new bootstrap.Modal(document.getElementById('deleteProductModal'));
        
        // Set the product ID in the modal
        document.getElementById('delete_product_id').value = productId;

        // Show the modal
        deleteProductModal.show();

        // Confirm delete action
        document.getElementById('confirmDelete').onclick = function() {
            fetch(`/admin/products/delete`, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json' // Set the content type
                },
                body: JSON.stringify({ product_id: productId }) // Send the product_id in the body
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse the JSON response
                } else {
                    throw new Error('Failed to delete product'); // Handle failed response
                }
            })
            .then(data => {
                if (data.success) {
                    alert("Product deleted successfully");
                    const row = button.closest('tr'); // Assuming the button is inside a <tr>
                    if (row) {
                        row.remove(); // Remove the row from the DOM
                    }
                    deleteProductModal.hide(); // Close the modal after deletion
                } else {
                    alert("Failed to delete product");
                }
            })
            .catch(error => {
                alert(error.message); // Show error message
            });
        };
    });
});
