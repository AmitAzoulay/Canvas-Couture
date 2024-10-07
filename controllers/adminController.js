const adminService = require('../services/adminService');
const productService = require('../services/productService');
const infoService = require('../services/infoService');
const sendTweet = require('../services/twitterService');

async function getAllProducts(req, res) {
    try {
        const products = await adminService.getAllProducts(); // Assuming this returns a list of products
        res.status(200).json({ products }); // Return products as JSON
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
}

function getProductById(req, res) {
    const product_id = req.params.product_id;
    productService.getProductById(product_id)
        .then(products => {
            const product = products[0]; // Access the first product in the array
            res.json(product);  // Send the product as a JSON response
        })
        .catch(error => {
            console.error('Error fetching product:', error);
            res.status(500).send('Internal Server Error');
        });
}


// Add a new product
async function addProduct(req, res) {
    const { product_id, name, category, color, size, price, stock, short_description } = req.body;
    console.log("Incoming Product Data:", req.body); // Log the incoming data
    try {
        await adminService.addProduct({
            product_id, name, category, color, size, price, stock, short_description
        });
        // Prepare the tweet text
        const tweetText = `New Arrival✨: ${name} (${category}) - only in $${price}. \n🛍️ Check it out on our website!`;

        // Send the tweet
        await sendTweet(tweetText); // Call the function to post a tweet

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


// Fetch all users
async function getAllUsers(req, res) {
    try {
        const users = await adminService.getAllUsers();
        res.status(200).json({ users }); // Return users as JSON
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ error: 'Failed to retrieve users.' });
    }
}

// Update user
async function updateUser(req, res) {
    const { _id,firstName, lastName, phoneNumber, email, isAdmin,isActive } = req.body;
    
    try {
        const updatedUser = await adminService.updateUser({
            _id,
            firstName,
            lastName,
            phoneNumber,
            email,
            isAdmin: isAdmin === 'on', // Checkbox handling
            isActive: isActive === 'on'
        });
        
        // Check if the product was successfully updated
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return JSON success response
        res.json({ message: 'User updated successfully', user: updatedUser });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Error updating user' });
    }
}

// Delete user
async function deleteUser(req, res) {
    const { _id } = req.body;
    console.log("delete user admin controller");
    try {
        // Call the service to delete the user
        await adminService.deleteUser(_id);
        // Send a success response
        res.json({ success: true });  
    } catch (error) {
        console.error("Error deleting user:", error);
        // Send an error response
        res.status(500).json({ success: false, message: 'Error deleting user' }); 
    }
}

async function getAllStatistics(req, res) {
    try {
        const statistics = await infoService.getAllStatistics();
        console.log(statistics)
        res.render("../views/admin.ejs", { statistics });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
    getAllUsers,
    updateUser,
    deleteUser,
    getAllStatistics
};
