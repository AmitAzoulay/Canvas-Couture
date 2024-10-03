document.addEventListener('DOMContentLoaded', function () {
    // When any edit button is clicked
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const product = {
                product_id: this.dataset.id,
                name: this.dataset.name,
                category: this.dataset.category,
                color: this.dataset.color,
                size: this.dataset.size,
                price: this.dataset.price,
                stock: this.dataset.stock,
                short_description: this.dataset.description
            };

            populateEditModal(product); // Call the function to populate modal
        });
    });
});

// Populate Edit Modal with product data
function populateEditModal(product) {
    
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

            // Update the product in the table without reloading
            const row = document.querySelector(`button[data-id="${formData.get('product_id')}"]`).closest('tr');
            row.querySelector('td:nth-child(2)').textContent = formData.get('name');
            row.querySelector('td:nth-child(3)').textContent = formData.get('category');
            row.querySelector('td:nth-child(4)').textContent = formData.get('color');
            row.querySelector('td:nth-child(5)').textContent = formData.get('size');
            row.querySelector('td:nth-child(6)').textContent = formData.get('price');
            row.querySelector('td:nth-child(7)').textContent = formData.get('stock');
            row.querySelector('td:nth-child(8)').textContent = formData.get('short_description');
        } else {
            alert(result.message || 'Failed to update product');
        }

    } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product');
    }
});