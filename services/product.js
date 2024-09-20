const Products = require("../models/product")

function getProductsByCategory(category) {
    return Products.find({ category }); // Assuming your product schema has a 'category' field
}

module.exports = {
    getProductsByCategory
};