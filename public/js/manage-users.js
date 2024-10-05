// Function to dynamically load users
function loadUsers() {
    fetch('/admin/users')
        .then(response => response.json())
        .then(data => {
            const usersTableBody = document.getElementById('usersTableBody');
            usersTableBody.innerHTML = ''; // Clear current users
            // Check if users exist and loop through them
            if (data.users && data.users.length > 0) {
            data.users.forEach(user => {
                console.log(user);
                // Create a row for each user
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.phoneNumber}</td>
                    <td>${user.email}</td>
                    <td>${user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>${user.isActive ? 'Yes' : 'No'}</td>
                    <td>
                        <!-- Edit button with data-* attributes -->
                        <button class="btn btn-warning btn-sm edit-user-btn"
                            data-id="${user._id}"
                            data-first="${user.firstName}"
                            data-last="${user.lastName}"
                            data-phone="${user.phoneNumber}"
                            data-email="${user.email}"
                            data-isAdmin="${user.isAdmin}"
                            data-isActive="${user.isActive}"
                            data-bs-toggle="modal" data-bs-target="#editUserModal">
                            Edit
                        </button>
                        <button class="btn btn-danger btn-sm delete-user" data-id="${user._id}" data-bs-toggle="modal" data-bs-target="#deleteUserModal"> Delete</button>
                    </td>
                `;
                usersTableBody.appendChild(row); // Append row to the table body
            });
            // Attach delete button event listeners after the rows are added
            document.querySelectorAll('.delete-user').forEach(button => {
                button.addEventListener('click', function() {
                    const userId = this.getAttribute('data-id'); // Get the user ID
                    document.getElementById('delete_user_id').value = userId; // Set user ID in hidden input
                });
            });
            // After the table is populated, attach the event listeners for the edit buttons
            document.querySelectorAll('.edit-user-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const user = {
                        _id: this.getAttribute('data-id'),
                        firstName: this.getAttribute('data-first'),
                        lastName: this.getAttribute('data-last'),
                        phoneNumber: this.getAttribute('data-phone'),
                        email: this.getAttribute('data-email'),
                        isAdmin: JSON.parse(this.getAttribute('data-isAdmin')),
                        isActive: JSON.parse(this.getAttribute('data-isActive'))
                    };
                    openEditModal(user);
                });
            });
            } else {
                usersTableBody.innerHTML = '<tr><td colspan="8">No users found</td></tr>';
            }
        })
        .catch(error => console.error('Error loading users:', error));
};

// Event listener for "Show All Users" button
document.getElementById('all-users-btn').addEventListener('click', loadUsers);

document.addEventListener('DOMContentLoaded', function () {
    // When any edit button is clicked
    document.querySelectorAll('.edit-user-btn').forEach(button => {
        button.addEventListener('click', function () {
            const user = {
                _id: this.dataset.id,
                firstName: this.dataset.first,
                lastName: this.dataset.last,
                phoneNumber: this.dataset.phone,
                email: this.dataset.email,
                isAdmin: this.dataset.isAdmin,
                isActive: this.dataset.isActive,
            };
            console.log(user);
            console.log("user");
            openEditModal(user); // Call the function to populate modal
        });
    });
});

// Open modal with user details for editing
function openEditModal(user) {
    document.getElementById('edit_id').value = user._id;
    document.getElementById('edit_firstName').value = user.firstName;
    document.getElementById('edit_lastName').value = user.lastName;
    document.getElementById('edit_email').value = user.email;
    document.getElementById('edit_phoneNumber').value = user.phoneNumber;
    document.getElementById('isAdmin').checked = JSON.parse(user.isAdmin);
    document.getElementById('isActive').checked = JSON.parse(user.isActive);

}

// Handle the form submission for updating user
document.getElementById('editUserForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    try{
        // Send PUT request to the backend
        const response = await fetch('/admin/users/update', {
            method: 'PUT', // Use PUT for updating
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send data as JSON
        });
    const result = await response.json();
    if (response.ok) {
        // Successfully updated the user
        alert('User updated successfully!');

        // Close the modal
        let editUserModal = document.getElementById('editUserModal');
        let modalInstance = bootstrap.Modal.getInstance(editUserModal); 
        modalInstance.hide();

        loadUsers();
    } else {
        alert(result.message || 'Failed to update user');
    }
    } catch (error) {
        console.error('Error updating user:', error);
        alert('Error updating user');
    }
});

// Delete user
document.getElementById('confirmUserDelete').addEventListener('click', function() {
    const userId = document.getElementById('delete_user_id').value; // Get the user ID from hidden input
    
    // Send DELETE request to the server
    fetch(`/admin/users/delete`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: userId }) // Send product ID in the request body
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the JSON response
        } else {
            console.log("manage users tried delete: ",userId);
            throw new Error('Failed to delete user');
        }
    })
    .then(data => {
        if (data.success) {
            alert("User deleted successfully");
            // Find the row in the table and remove it
            const row = document.querySelector(`button[data-id="${userId}"]`).closest('tr');
            if (row) {
                row.remove(); // Remove the row from the table
            }
            // Hide the modal
            const deleteProductModal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
            deleteProductModal.hide();
        } else {
            alert("Failed to delete product");
        }
    })
    .catch(error => {
        alert(error.message); // Show error message if something goes wrong
    });
});

