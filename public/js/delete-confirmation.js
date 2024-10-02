document.querySelectorAll('.delete-product').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        if (confirm("Are you sure you want to delete this product?")) {
            fetch(`/admin/products/delete/${productId}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        alert("Product deleted successfully");
                        location.reload();  // Reload the page or update table dynamically
                    } else {
                        alert("Failed to delete product");
                    }
                });
        }
    });
});
