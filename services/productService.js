const Products = require("../models/product")

function getAllProducts() {
    return Products.find(); // This fetches all products from the database
}

function getProductsByCategory(category) {
    return Products.find({ category }); // Assuming your product schema has a 'category' field
}

function getProductsByName(name) {
    return Products.find({ name }); // Assuming your product schema has a 'category' field
}

function getProductById(product_id){
    return Products.find({ product_id });
}
module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsByName,
    getProductById
};