// Add this to your JavaScript file
document.getElementById("userSearchInput").addEventListener("input", function () {
    const searchTerm = this.value;
    searchUsers(searchTerm);
});

function searchUsers(searchTerm) {
    if (searchTerm.length < 1) {
        loadAllUsers(); // Load all users if the search term is empty
        return;
    }

    fetch(`/admin/users/search?search=${encodeURIComponent(searchTerm)}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const userTableBody = document.getElementById("usersTableBody");
            userTableBody.innerHTML = ''; // Clear the current user list

            data.users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.phoneNumber}</td>
                    <td>${user.email}</td>
                    <td>${user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>${user.isActive ? 'Yes' : 'No'}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="editUser('${user._id}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="confirmDeleteUser('${user._id}')">Delete</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadAllUsers() {
    fetch('/admin/users') // Adjust the route as needed
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById("usersTableBody");
            userTableBody.innerHTML = ''; // Clear current list

            data.users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.phoneNumber}</td>
                    <td>${user.email}</td>
                    <td>${user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>${user.isActive ? 'Yes' : 'No'}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="editUser('${user._id}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="confirmDeleteUser('${user._id}')">Delete</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading users:', error));
}
