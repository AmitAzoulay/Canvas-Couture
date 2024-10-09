const adminService = require('../services/adminService');
const productService = require('../services/productService');
const infoService = require('../services/infoService');
const sendTweet = require('../services/twitterService');
const User = require('../models/user');


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
    const image = req.file ? req.file.filename : null; // Get the uploaded image filename
    console.log("Incoming Product Data:", req.body,"and",image); // Log the incoming data
    try {
        await adminService.addProduct({
            product_id, name, category, color, size, price, stock, short_description, image
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
    const { user_id,firstName, lastName, phoneNumber, email, isAdmin,isActive } = req.body;
    
    try {
        const updatedUser = await adminService.updateUser({
            user_id,
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
        res.render("../views/admin.ejs", { statistics });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function searchUsers(req, res) {
    const searchTerm = req.query.search || '';
    try {
        const users = await User.find({
            $or: [
                { firstName: { $regex: `^${searchTerm}`, $options: 'i' } },
                { lastName: { $regex: `^${searchTerm}`, $options: 'i' } }
            ]
        });
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Fetch all orders
async function getAllOrders(req, res) {
    try {
        const orders = await adminService.getAllOrders();
        res.status(200).json({ orders }); // Return orders as JSON
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        res.status(500).json({ error: 'Failed to retrieve orders.' });
    }
}

// Controller function to search orders by status
async function searchOrdersByStatus(req, res) {
    const searchStatus = req.query.status;

    try {
        // If no status is provided or it's "All", return all orders
        if (!searchStatus || searchStatus === 'All') {
            const orders = await adminService.getAllOrders();
            return res.json({ orders });
        }

        // Otherwise, filter by the provided status
        const orders = await adminService.searchOrdersByStatus(searchStatus);
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

//Update Order
async function updateOrder(req, res) {
    const { _id, status } = req.body;

    console.log("Data received from frontend:", req.body);

    try {
        const updatedOrder = await adminService.updateOrderStatus(_id, status);

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: 'Error updating order status' });
    }
}


// Delete order
async function deleteOrder(req, res) {
    const { _id } = req.body;
    console.log("delete order admin controller");
    try {
        await adminService.deleteOrder(_id);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ success: false, message: 'Error deleting order' });
    }
}

// Fetch all branches
async function getAllBranches(req, res) {
    try {
        const branches = await adminService.getAllBranches();
        res.status(200).json({ branches }); // Return branches as JSON
    } catch (error) {
        console.error('Failed to fetch branches:', error);
        res.status(500).json({ error: 'Failed to retrieve branches.' });
    }
}

//Update Order
async function updateBranch(req, res) {
    const { branch_id, name, address } = req.body;

    console.log("Data received from frontend:", req.body);

    try {
        const updatedBranch = await adminService.updateBranch(branch_id, name, address);

        if (!updatedBranch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        res.json({ message: 'Branch updated successfully', order: updatedBranch });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: 'Error updating branch' });
    }
}


// Delete branch
async function deleteBranch(req, res) {
    const { branch_id } = req.body;
    console.log("delete branch admin controller");
    try {
        await adminService.deleteBranch(branch_id);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting branch:", error);
        res.status(500).json({ success: false, message: 'Error deleting branch' });
    }
}

// Add a new branch
async function addBranch(req, res) {
    const { name, address} = req.body;
    console.log("Incoming Branch Data:", req.body); // Log the incoming data
    try {
        await adminService.addBranch({
            name, address
        });
        // Prepare the tweet text
        const tweetText = `News Flash!!! Opening a new branch✨: ${name} in (${address}). \n🛍️ Go Check it out!`;

        // Send the tweet
        await sendTweet(tweetText); // Call the function to post a tweet

        res.json({ success: true, message: 'Branch added successfully' }); // Send JSON response
    } catch (error) {
        console.error("Error adding branch:", error);
        res.status(500).json({ success: false, message: 'Error adding branch' }); // Send error response
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
    getAllStatistics,
    searchUsers,
    deleteOrder,
    updateOrder,
    getAllOrders,
    searchOrdersByStatus,
    deleteBranch,
    updateBranch,
    getAllBranches,
    addBranch
};
