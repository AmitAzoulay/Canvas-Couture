document.getElementById("applyFilter").addEventListener("click", function () {
    const form = document.getElementById("filterForm");
    const selectedFilters = {
        category: Array.from(form.elements['category'])
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value),
        color: Array.from(form.elements['color'])
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value),
        size: Array.from(form.elements['size'])
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value),
        price: Array.from(form.elements['price'])
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value),
    };

    applyFilters(selectedFilters);

    // Hide the filter modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('filterModal'));
    modal.hide();
});

function applyFilters(filters) {
    fetch('/products/search/filtered', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
    })
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear the current product list

        if (data.products.length === 0) {
            const noProductsMessage = document.createElement('div');
            noProductsMessage.className = 'no-products-message';
            noProductsMessage.textContent = 'No products found';
            productList.appendChild(noProductsMessage);
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
                    ${product.stock > 0 ? `
                        <button class="stock-btn" onclick="addToCart('${product._id}')">
                            <i class="fa fa-plus">+</i>
                        </button>
                    ` : `<p class="out-of-stock">Out of stock</p>`}
                `;
                productList.appendChild(li);
            });
        }
    })
    .catch(error => console.error('Error:', error));
}
