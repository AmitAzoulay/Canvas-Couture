const Product = require("../models/product")

// Add a new product
async function addProduct (productData){
    try {
        const product = new Product(productData);
        await product.save();
    } catch (error) {
        throw new Error('Error adding product');
    }
};
// Service to get all products
async function getAllProducts() {
    try {
        // Fetch all products from MongoDB
        const products = await Product.find();
        console.log("admin serviceeeeeeeeeee")
        return products;
    } catch (error) {
        throw new Error('Error retrieving products');
    }
};
module.exports = {
    getAllProducts,
    addProduct
};