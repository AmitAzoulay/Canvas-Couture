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
                            <!-- Delete button with onclick for product ID -->
                            <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteProductModal" 
                                    onclick="setDeleteProductId('${product.product_id}')">
                                Delete
                            </button>
                        </td>
                    `;
                    productsTableBody.appendChild(row);
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
