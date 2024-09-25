const Products = require("../models/product")

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
    getProductsByCategory,
    getProductsByName,
    getProductById
};