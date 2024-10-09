document.getElementById('addProductForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Create a new FormData object
    const formData = new FormData();
    formData.append('product_id', document.getElementById('product_id').value);
    formData.append('name', document.getElementById('name').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('color', document.getElementById('color').value);
    formData.append('size', document.getElementById('size').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('stock', document.getElementById('stock').value);
    formData.append('short_description', document.getElementById('short_description').value);

    // Get the selected image file
    const imageFile = document.getElementById('image').files[0];
    formData.append('image', imageFile); // Append the image file to the form data


    // Validation
    const priceInput = document.getElementById('price');
    const stockInput = document.getElementById('stock');
    const price = parseFloat(priceInput.value);
    const stock = parseFloat(stockInput.value);
    const priceError = document.getElementById('priceError');
    const stockError = document.getElementById('stockError');

    // Reset error messages
    priceError.style.display = 'none';
    stockError.style.display = 'none';

    // Validate price and stock
    if (price <= 0) {
        priceError.style.display = 'block'; // Show price error
        priceInput.focus();
        return;
    }
    if (stock < 0) {
        stockError.style.display = 'block'; // Show stock error
        stockInput.focus();
        return;
    }

    try {
        const response = await fetch('/admin/products/add', {
            method: 'POST',
            // No need to set 'Content-Type', it will be automatically set to multipart/form-data
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                const accordion = new bootstrap.Collapse(document.getElementById('collapseAddProduct'));
                accordion.hide();
                alert('Product added successfully!');
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
