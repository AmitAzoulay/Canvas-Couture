const Product = require("../models/product");
const User = require('../models/user'); // Assuming you have a User model


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
    // Retrieve all users
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error('Error retrieving users');
    }
}

async function updateUser(userData) {
    const { _id,firstName, lastName, phoneNumber, email, isAdmin,isActive } = userData;
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");

    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.isAdmin = isAdmin;
    user.isActive = isActive;
    await user.save();
    return user;
}

async function deleteUser(_id) {
    console.log("delete user admin service",_id);
    try {
        // Delete the user from the database using _id
        await User.findOneAndDelete({ _id: _id });
    } catch (error) {
        throw new Error('Error deleting user');
    }
}
module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllUsers,
    updateUser,
    deleteUser
};
