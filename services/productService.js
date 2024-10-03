const Products = require("../models/product");

// Fetch all products
function getAllProducts() {
    return Products.find().exec(); // Ensures it returns a promise
}

// Fetch products by category
function getProductsByCategory(category) {
    return Products.find({ category }).exec(); // Ensures it returns a promise
}

// Fetch products by name
function getProductsByName(name) {
    return Products.find({ name }).exec(); // Ensures it returns a promise
}

// Fetch product by ID
function getProductById(product_id) {
    return Products.find({ product_id }).exec(); // Ensures it returns a promise
}

<<<<<<< HEAD
// New function for prefix searches
function getProductsByNameStartsWith(searchTerm) {
    return Products.find({
        name: { $regex: `^${searchTerm}`, $options: 'i' } // Matches names starting with searchTerm
    }).exec(); // Ensures it returns a promise
}
=======
>>>>>>> ea9759d0659af9559774e6fccd7aaa797a0f8169

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsByName,
    getProductById,
    getProductsByNameStartsWith
};
