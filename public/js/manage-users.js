// Function to dynamically load users
function loadUsers() {
    fetch('/admin/users')
        .then(response => response.json())
        .then(users => {
            const usersTable = document.getElementById('usersTableBody');
            usersTable.innerHTML = ''; // Clear current users
            
            users.forEach(user => {
                // Create a row for each user
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>
                        <button class="btn btn-primary" onclick="openEditModal(${user._id})">Edit</button>
                        <button class="btn btn-danger" onclick="openDeleteModal('${user._id}')">Delete</button>
                    </td>
                `;
                usersTable.appendChild(row); // Append row to the table body
            });
        })
        .catch(error => console.error('Error loading users:', error));
}

// Event listener for "Show All Users" button
document.getElementById('showAllUsersBtn').addEventListener('click', loadUsers);

// Open modal with user details for editing
function openEditModal(userId) {
    fetch(`/admin/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userId').value = user._id;
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            document.getElementById('phoneNumber').value = user.phoneNumber;
            document.getElementById('isAdminCheckbox').checked = user.isAdmin;

            document.getElementById('editUserModal').style.display = 'block';
        });
}

// Handle the form submission for updating user
document.getElementById('editUserForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('/admin/users/update', {
        method: 'POST',
        body: formData
    }).then(() => {
        loadUsers();
        document.getElementById('editUserModal').style.display = 'none';
    });
});

// Delete user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/admin/users/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        }).then(() => loadUsers());
    }
}

// Load users on page load
document.addEventListener('DOMContentLoaded', loadUsers);

let userIdToDelete = null;

// Open Delete Modal
function openDeleteModal(userId) {
    userIdToDelete = userId; // Save the user ID to be deleted
    document.getElementById('deleteUserModal').style.display = 'block'; // Show modal
}

// Confirm Delete Button
document.getElementById('confirmDeleteUser').addEventListener('click', function () {
    fetch(`/admin/users/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userIdToDelete }) // Pass the user ID to delete
    }).then(() => {
        document.getElementById('deleteUserModal').style.display = 'none'; // Hide modal
        loadUsers(); // Refresh the users table
    });
});

// Cancel Delete Button
document.getElementById('cancelDeleteUser').addEventListener('click', function () {
    document.getElementById('deleteUserModal').style.display = 'none'; // Hide modal
});

