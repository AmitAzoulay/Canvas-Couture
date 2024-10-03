const Product = require("../models/product");
const User = require('../models/user'); // Assuming you have a User model

async function createUser(userData) {
    const { firstName, lastName, email, phoneNumber, password, isAdmin } = userData;

    // Hash the password and create the user
    const hashedPassword = await hashPassword(password); // Assuming you have a hash function
    const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        isAdmin,  // Assign admin status
    });

    await newUser.save();
};

// Add a new product
async function addProduct(productData) {
    try {
        const product = new Product(productData);
        await product.save();
    } catch (error) {
        throw new Error('Error adding product');
    }
}

// Service to get all products
async function getAllProducts() {
    console.log("admin service");
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        throw new Error('Error retrieving products');
    }
}
// Update product service
async function updateProduct(product_id, updatedFields) {
    try {
        // Update the product in the database based on the product_id
        const updatedProduct = await Product.findOneAndUpdate(
            { product_id }, // Ensure product_id matches the correct field in your schema
            updatedFields,
            { new: true, runValidators: true }  // Return the updated product and run validators
        );

        return updatedProduct; // This will return the updated product if found
    } catch (error) {
        console.error("Error updating product in service:", error);
        throw error; // Rethrow the error to be handled by the controller
    }
}

// Delete a product service 
async function deleteProduct(productId) {
    try {
        // Delete the product from the database using product_id
        await Product.findOneAndDelete({ product_id: productId });
    } catch (error) {
        throw new Error('Error deleting product');
    }
}
async function getAllUsers() {
    return await User.find(); // Retrieve all users
}

async function updateUser(userData) {
    const { userId, firstName, lastName, phoneNumber, email, isAdmin } = userData;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.isAdmin = isAdmin;

    await user.save();
    return user;
}

async function deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("User not found");
}
module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
