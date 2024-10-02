document.getElementById('show-products-btn').addEventListener('click', function() {
    // Fetch products from the server
    fetch('/admin/products')
        .then(response => response.json())
        .then(data => {
            const productsTableBody = document.getElementById('products-table-body');
            productsTableBody.innerHTML = ''; // Clear the existing table content
            
            // Check if products exist and loop through them
            if (data.products && data.products.length > 0) {
                data.products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.product_id}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.color}</td>
                        <td>${product.size}</td>
                        <td>${product.price}</td>
                        <td>${product.stock}</td>
                        <td>${product.short_description}</td>
                        <td>
                            <!-- Edit button with data-* attributes -->
                            <button class="btn btn-warning btn-sm edit-btn"
                                data-id="${product.product_id}"
                                data-name="${product.name}"
                                data-category="${product.category}"
                                data-color="${product.color}"
                                data-size="${product.size}"
                                data-price="${product.price}"
                                data-stock="${product.stock}"
                                data-description="${product.short_description}"
                                data-bs-toggle="modal" data-bs-target="#editProductModal">
                                Edit
                            </button>
                            <!-- Delete button -->
                            <button class="btn btn-danger btn-sm delete-product" data-id="${product.product_id}" data-bs-toggle="modal" data-bs-target="#deleteProductModal">
                                Delete
                            </button>
                        </td>
                    `;
                    productsTableBody.appendChild(row);
                });
                // Attach delete button event listeners after the rows are added
                document.querySelectorAll('.delete-product').forEach(button => {
                    button.addEventListener('click', function() {
                        const productId = this.getAttribute('data-id'); // Get the product ID
                        document.getElementById('delete_product_id').value = productId; // Set product ID in hidden input
                    });
                });
                // After the table is populated, attach the event listeners for the edit buttons
                document.querySelectorAll('.edit-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const product = {
                            product_id: this.getAttribute('data-id'),
                            name: this.getAttribute('data-name'),
                            category: this.getAttribute('data-category'),
                            color: this.getAttribute('data-color'),
                            size: this.getAttribute('data-size'),
                            price: this.getAttribute('data-price'),
                            stock: this.getAttribute('data-stock'),
                            short_description: this.getAttribute('data-description')
                        };
                        populateEditModal(product);
                    });
                });

            } else {
                productsTableBody.innerHTML = '<tr><td colspan="8">No products found</td></tr>';
            }
        })
        .catch(error => console.error('Error fetching products:', error));
});

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
