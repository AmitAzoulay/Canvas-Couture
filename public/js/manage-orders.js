// Function to dynamically load orders
function loadOrders() {
    console.log("load orders");
    fetch('/admin/orders')
        .then(response => response.json())
        .then(data => {
            const ordersTableBody = document.getElementById('ordersTableBody');
            ordersTableBody.innerHTML = ''; // Clear current orders
            
            if (data.orders && data.orders.length > 0) {
                data.orders.forEach(order => {
                    console.log(order);

                    // Format the items into a readable string (product name and quantity)
                    const formattedItems = order.items.map(item => `${item.name} (x${item.quantity})`).join(', ');

                    // Create a row for each order
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order._id}</td>
                        <td>${order.userId}</td>
                        <td>${new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>${order.status}</td>
                        <td>${formattedItems}</td>
                        <td>${order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-order-btn"
                                data-id="${order._id}"
                                data-user="${order.userId}"
                                data-items="${formattedItems}"
                                data-date="${order.orderDate}"
                                data-status="${order.status}"
                                data-ordered="${order.ordered}"
                                data-bs-toggle="modal" data-bs-target="#editOrderModal">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-sm delete-order" data-id="${order._id}" data-bs-toggle="modal" data-bs-target="#deleteOrderModal"> Delete</button>
                        </td>
                    `;
                    ordersTableBody.appendChild(row); // Append row to the table body
                });

                // Attach delete button event listeners after the rows are added
                document.querySelectorAll('.delete-order').forEach(button => {
                    button.addEventListener('click', function() {
                        const orderId = this.getAttribute('data-id'); // Get the order ID
                        document.getElementById('delete_order_id').value = orderId; // Set order ID in hidden input
                    });
                });

                // Attach the event listeners for the edit buttons
                document.querySelectorAll('.edit-order-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const itemsString = this.getAttribute('data-items');
        
                        // Parse the string to an array of objects
                        const items = itemsString.split(', ').map(itemString => {
                            const match = itemString.match(/(.+)\s\(x(\d+)\)/);
                            if (match) {
                                return {
                                    name: match[1],
                                    quantity: parseInt(match[2], 10)
                                };
                            }
                        }).filter(item => item);  // Remove undefined values if the regex doesn't match
                        const order = {
                            _id: this.getAttribute('data-id'),
                            userId: this.getAttribute('data-user'),
                            items: this.getAttribute('data-items'),
                            orderDate: this.getAttribute('data-date'),
                            status: this.getAttribute('data-status'),
                            ordered: JSON.parse(this.getAttribute('data-ordered')),
                        };
                        openEditModal(order);
                    });
                });

            } else {
                ordersTableBody.innerHTML = '<tr><td colspan="8">No orders found</td></tr>';
            }
        })
        .catch(error => console.error('Error loading orders:', error));
};


// Event listener for "Show All Orders" button
document.getElementById('show-orders-btn').addEventListener('click', loadOrders);

document.addEventListener('DOMContentLoaded', function () {
    // When any edit button is clicked
    document.querySelectorAll('.edit-order-btn').forEach(button => {
        button.addEventListener('click', function () {
            const order = {
                _id: this.dataset.id,
                userId: this.dataset.user,
                items: this.dataset.items,
                orderDate: this.dataset.date,
                status: this.dataset.status,
                ordered: this.dataset.ordered,
            };
            console.log(order);
            console.log("order");
            openEditModal(order); // Call the function to populate modal
        });
    });
});

// Open modal with order details for editing
function openEditModal(order) {
    document.getElementById('edit_order_id').value = order._id;
    document.getElementById('edit_status').value = order.status;
}


// Handle the form submission for updating order
document.getElementById('editOrderForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    console.log("Data being sent to the server:", data);

    try {
        const response = await fetch('/admin/orders/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send only _id and status
        });

        const result = await response.json();
        if (response.ok) {
            alert('Order status updated successfully!');
            let editOrderModal = document.getElementById('editOrderModal');
            let modalInstance = bootstrap.Modal.getInstance(editOrderModal); 
            modalInstance.hide();
            loadOrders(); // Reload the orders after update
        } else {
            alert(result.message || 'Failed to update order status');
        }
    } catch (error) {
        console.error('Error updating order:', error);
        alert('Error updating order status');
    }
});


// Delete order
document.getElementById('confirmOrderDelete').addEventListener('click', function() {
    const orderId = document.getElementById('delete_order_id').value; // Get the order ID from hidden input
    
    // Send DELETE request to the server
    fetch(`/admin/orders/delete`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: orderId }) // Send product ID in the request body
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the JSON response
        } else {
            console.log("manage orders tried delete: ",orderId);
            throw new Error('Failed to delete order');
        }
    })
    .then(data => {
        if (data.success) {
            alert("order deleted successfully");
            // Find the row in the table and remove it
            const row = document.querySelector(`button[data-id="${userId}"]`).closest('tr');
            if (row) {
                row.remove(); // Remove the row from the table
            }
            // Hide the modal
            const deleteOrderModal = bootstrap.Modal.getInstance(document.getElementById('deleteOrderModal'));
            deleteOrderModal.hide();
        } else {
            alert("Failed to delete order");
        }
    })
    .catch(error => {
        alert(error.message); // Show error message if something goes wrong
    });
});

