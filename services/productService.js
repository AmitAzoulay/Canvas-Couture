const Products = require("../models/product");

function getAllProducts() {
    return Products.find();
}

function getProductsByCategory(category) {
    return Products.find({ category });
}

function getProductsByName(name) {
    return Products.find({ name });
}

function getProductById(product_id) {
    return Products.find({ product_id });
}

// New function for prefix searches
function getProductsByNameStartsWith(searchTerm) {
    return Products.find({
        name: { $regex: `^${searchTerm}`, $options: 'i' } // Matches names starting with searchTerm
    });
}

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsByName,
    getProductById,
    getProductsByNameStartsWith
};
