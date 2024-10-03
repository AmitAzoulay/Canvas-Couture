
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