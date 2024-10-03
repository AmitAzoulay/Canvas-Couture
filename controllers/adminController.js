const adminService = require('../services/adminService');

async function getAllProducts(req, res) {
    try {
        const products = await adminService.getAllProducts(); // Assuming this returns a list of products
        res.status(200).json({ products }); // Return products as JSON
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
}

// Add a new product
async function addProduct(req, res) {
    const { product_id, name, category, color, size, price, stock, short_description } = req.body;
    console.log("Incoming Product Data:", req.body); // Log the incoming data
    try {
        await adminService.addProduct({
            product_id, name, category, color, size, price, stock, short_description
        });
        res.json({ success: true, message: 'Product added successfully' }); // Send JSON response
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: 'Error adding product' }); // Send error response
    }
}

// Edit product controller
async function editProduct(req, res) {
    const { product_id, name, category, color, size, price, stock, short_description } = req.body;

    try {
        // Call service layer to update the product
        const updatedProduct = await adminService.updateProduct(product_id, {
            name,
            category,
            color,
            size,
            price,
            stock,
            short_description
        });

        // Check if the product was successfully updated
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return JSON success response
        res.json({ message: 'Product updated successfully', product: updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Error updating product' });
    }
}

// Delete product controller
async function deleteProduct(req, res) {
    const { product_id } = req.body;

    try {
        // Call the service to delete the product
        await adminService.deleteProduct(product_id);
        // Send a success response
        res.json({ success: true });  
    } catch (error) {
        console.error("Error deleting product:", error);
        // Send an error response
        res.status(500).json({ success: false, message: 'Error deleting product' }); 
    }
}

async function createNewUser(req, res){
    try {
        const { firstName, lastName, email, phoneNumber, password, isAdmin } = req.body;
        await userService.createUser({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            isAdmin: isAdmin === 'on',  // Handle checkbox as boolean
        });
        res.redirect('/admin/users');  // Redirect after success
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
// Fetch all users
async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.json(users); // Send users as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users.' });
    }
}

// Update user
async function updateUser(req, res) {
    const { userId, firstName, lastName, phoneNumber, email, isAdmin } = req.body;
    try {
        const updatedUser = await userService.updateUser({
            userId,
            firstName,
            lastName,
            phoneNumber,
            email,
            isAdmin: isAdmin === 'on' // Checkbox handling
        });
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user.' });
    }
}

// Delete user
async function deleteUser(req, res) {
    const { userId } = req.body;
    try {
        await userService.deleteUser(userId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user.' });
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    editProduct,
    deleteProduct,
    createNewUser,
    getAllUsers,
    updateUser,
    deleteUser
};
