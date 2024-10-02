const Product = require("../models/product");

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

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};
