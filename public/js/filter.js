document.addEventListener('DOMContentLoaded', () => {
    const applyFiltersButton = document.getElementById('applyFilters');

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', function() {
            console.log('Apply Filters button clicked');

            // Get selected categories
            const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
            console.log('Selected Categories:', selectedCategories);

            // Get selected sizes
            const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(cb => cb.value);
            console.log('Selected Sizes:', selectedSizes);

            // Get price range
            const minPrice = document.getElementById('minPrice').value;
            const maxPrice = document.getElementById('maxPrice').value;
            console.log('Min Price:', minPrice, 'Max Price:', maxPrice);

            // Construct query parameters
            const queryParams = new URLSearchParams();
            if (selectedCategories.length > 0) {
                queryParams.append('categories', selectedCategories.join(','));
            }
            if (selectedSizes.length > 0) {
                queryParams.append('sizes', selectedSizes.join(','));
            }
            if (minPrice) {
                queryParams.append('minPrice', minPrice);
            }
            if (maxPrice) {
                queryParams.append('maxPrice', maxPrice);
            }

            // Fetch filtered products
            fetch(`/products/search/filtered?${queryParams}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const productList = document.getElementById('productList');
                    productList.innerHTML = ''; // Clear current products

                    if (data.products.length === 0) {
                        productList.innerHTML = '<p>No products found.</p>'; // Display message if no products
                    } else {
                        data.products.forEach(product => {
                            const li = document.createElement('li');
                            li.className = 'product-item';
                            li.innerHTML = `
                                <a href="/products/search/product/${product.product_id}" class="product-link">
                                    <p><img src="/img/${product.name}.png" alt="${product.name}" class="card-product-img" /></p>
                                    <h3>${product.name}</h3>
                                </a>
                                <p>Price: $${product.price}</p>
                                <p>Color: ${product.color}</p>
                                <p>Size: ${product.size}</p>
                                <p>Gender: ${product.gender}</p>
                                <p>Category: ${product.category}</p>
                            `;
                            productList.appendChild(li);
                        });
                    }

                    // Close the modal
                    const modalElement = document.getElementById('filterModal');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) {
                        modal.hide(); // Close the modal
                        console.log('Modal should be closed now.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching filtered products:', error);
                    alert('There was an error fetching products. Please try again.');
                });
        });
    } else {
        console.error('Apply Filters button not found');
    }

    // Reset modal inputs when the modal is closed
    const modalElement = document.getElementById('filterModal');
    modalElement.addEventListener('hidden.bs.modal', function () {
        // Reset your filter inputs
        document.querySelectorAll('input[name="category"]:checked').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[name="size"]:checked').forEach(cb => cb.checked = false);
        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';
    });
});
