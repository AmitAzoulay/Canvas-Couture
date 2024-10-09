
// Populate Edit Modal with product data
function populateEditModal(product) {
    console.log("edit modal");
    document.getElementById('edit_product_id').value = product.product_id;
    document.getElementById('edit_name').value = product.name;
    document.getElementById('edit_category').value = product.category;
    document.getElementById('edit_color').value = product.color;
    document.getElementById('edit_size').value = product.size;
    document.getElementById('edit_price').value = product.price;
    document.getElementById('edit_stock').value = product.stock;
    document.getElementById('edit_short_description').value = product.short_description;

    // If you're using a dropdown for categories, ensure the correct category is selected
    const categoryDropdown = document.getElementById('edit_category');
    for (let option of categoryDropdown.options) {
        if (option.value === product.category) {
            option.selected = true;
            break;
        }
    }
}

document.getElementById('editProductForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Gather form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    try {
        // Send PUT request to the backend
        const response = await fetch('/admin/products/edit', {
            method: 'PUT', // Use PUT for updating
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send data as JSON
        });

        const result = await response.json();

        if (response.ok) {
            // Successfully updated the product
            alert('Product updated successfully!');

            // Close the modal
            let editProductModal = document.getElementById('editProductModal');
            let modalInstance = bootstrap.Modal.getInstance(editProductModal); 
            modalInstance.hide();

            loadProducts();
        } else {
            alert(result.message || 'Failed to update product');
        }

    } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product');
    }
});