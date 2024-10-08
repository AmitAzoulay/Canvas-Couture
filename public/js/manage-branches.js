// Function to dynamically load branches
function loadBranches() {
    console.log("load branches");
    fetch('/admin/branches')
        .then(response => response.json())
        .then(data => {
            const branchesTableBody = document.getElementById('branchesTableBody');
            branchesTableBody.innerHTML = ''; // Clear current branches
            // Check if branches exist and loop through them
            if (data.branches && data.branches.length > 0) {
            data.branches.forEach(branch => {
                console.log(branch);
                // Create a row for each branch
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${branch.name}</td>
                    <td>${branch.address}</td>
                    <td>
                        <!-- Edit button with data-* attributes -->
                        <button class="btn btn-warning btn-sm edit-branch-btn"
                            data-id="${branch._id}"
                            data-name="${branch.name}"
                            data-address="${branch.address}"
                            data-bs-toggle="modal" data-bs-target="#editBranchModal">
                            Edit
                        </button>
                        <button class="btn btn-danger btn-sm delete-branch" data-id="${branch._id}" data-bs-toggle="modal" data-bs-target="#deleteBranchModal"> Delete</button>
                    </td>
                `;
                branchesTableBody.appendChild(row); // Append row to the table body
            });
            // Attach delete button event listeners after the rows are added
            document.querySelectorAll('.delete-branch').forEach(button => {
                button.addEventListener('click', function() {
                    const branchId = this.getAttribute('data-id'); // Get the branch ID
                    document.getElementById('delete_branch_id').value = branchId; // Set branch ID in hidden input
                });
            });
            // After the table is populated, attach the event listeners for the edit buttons
            document.querySelectorAll('.edit-branch-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const branch = {
                        _id: this.getAttribute('data-id'),
                        name: this.getAttribute('data-name'),
                        address: this.getAttribute('data-address'),
                    };
                    openEditModal(branch);
                });
            });
            } else {
                branchesTableBody.innerHTML = '<tr><td colspan="8">No branches found</td></tr>';
            }
        })
        .catch(error => console.error('Error loading branches:', error));
};

// Event listener for "Show All branches" button
document.getElementById('all-branches-btn').addEventListener('click', loadBranches);

document.addEventListener('DOMContentLoaded', function () {
    // When any edit button is clicked
    document.querySelectorAll('.edit-branch-btn').forEach(button => {
        button.addEventListener('click', function () {
            const branch = {
                _id: this.dataset.id,
                name: this.dataset.name,
                address: this.dataset.address,
            };
            console.log(branch);
            console.log("branch");
            openEditModal(branch); // Call the function to populate modal
        });
    });
});

// Open modal with branch details for editing
function openEditModal(branch) {
    document.getElementById('edit_id').value = branch._id;
    document.getElementById('edit_branchName').value = branch.name;
    document.getElementById('edit_address').value = branch.address;
}

// Handle the form submission for updating branch
document.getElementById('editBranchForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    try{
        // Send PUT request to the backend
        const response = await fetch('/admin/branches/update', {
            method: 'PUT', // Use PUT for updating
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send data as JSON
        });
    const result = await response.json();
    if (response.ok) {
        // Successfully updated the branch
        alert('Branch updated successfully!');

        // Close the modal
        let editBranchModal = document.getElementById('editBranchModal');
        let modalInstance = bootstrap.Modal.getInstance(editBranchModal); 
        modalInstance.hide();

        loadBranches();
    } else {
        alert(result.message || 'Failed to update branch');
    }
    } catch (error) {
        console.error('Error updating branch:', error);
        alert('Error updating branch');
    }
});

// Delete branch
document.getElementById('confirmBranchDelete').addEventListener('click', function() {
    const branchId = document.getElementById('delete_branch_id').value; // Get the branch ID from hidden input
    
    // Send DELETE request to the server
    fetch(`/admin/branches/delete`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: branchId }) // Send product ID in the request body
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the JSON response
        } else {
            console.log("manage branches tried delete: ",branchId);
            throw new Error('Failed to delete branch');
        }
    })
    .then(data => {
        if (data.success) {
            alert("Branch deleted successfully");
            // Find the row in the table and remove it
            const row = document.querySelector(`button[data-id="${branchId}"]`).closest('tr');
            if (row) {
                row.remove(); // Remove the row from the table
            }
            // Hide the modal
            const deleteBranchModal = bootstrap.Modal.getInstance(document.getElementById('deleteBranchModal'));
            deleteBranchModal.hide();
        } else {
            alert("Failed to delete branch");
        }
    })
    .catch(error => {
        alert(error.message); // Show error message if something goes wrong
    });
});

document.getElementById('branchForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById('branchName').value,
        address: document.getElementById('address').value
    };

    try {
        const response = await fetch('/admin/branches/add', {
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
                const accordion = new bootstrap.Collapse(document.getElementById('collapseAddBranch'));
                accordion.hide();

                // Show success alert
                alert('Branch added successfully!');

                // Optionally reset the form
                document.getElementById('branchForm').reset();
            } else {
                alert('Failed to add branch.');
            }
        } else {
            alert('Error adding branch.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});

