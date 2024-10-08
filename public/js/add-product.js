
document.getElementById('addProductForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        product_id: document.getElementById('product_id').value,
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        color: document.getElementById('color').value,
        size: document.getElementById('size').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        short_description: document.getElementById('short_description').value
    };

    //Validation
    // Get form data
    const priceInput = document.getElementById('price');
    const stockInput = document.getElementById('stock');

    const price = parseFloat(priceInput.value);
    const stock = parseFloat(stockInput.value);

    // Get error message elements
    const priceError = document.getElementById('priceError');
    const stockError = document.getElementById('stockError');

    // Reset the error messages
    priceError.style.display = 'none';
    stockError.style.display = 'none';

    // Validation flags
    let valid = true;

    // Validate the price
    if (price <= 0) {
        priceError.style.display = 'block'; // Show price error
        priceInput.focus();
        return;
    }

    // Validate the stock
    if (stock <= 0) {
        stockError.style.display = 'block'; // Show stock error
        stockInput.focus();
        return;
    }
    
    try {
        const response = await fetch('/admin/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                // Close the accordion
                const accordion = new bootstrap.Collapse(document.getElementById('collapseAddProduct'));
                accordion.hide();

                // Show success alert
                alert('Product added successfully!');

                // Optionally reset the form
                document.getElementById('addProductForm').reset();
            } else {
                alert('Failed to add product.');
            }
        } else {
            alert('Error adding product.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});