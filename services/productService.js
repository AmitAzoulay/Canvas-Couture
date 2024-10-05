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

// New function for prefix searches
function getProductsByNameStartsWith(searchTerm) {
    return Products.find({
        name: { $regex: `^${searchTerm}`, $options: 'i' } // Matches names starting with searchTerm
    }).exec(); // Ensures it returns a promise
}

function getFilteredProducts(filters) {
    const query = {};

    if (filters.category && filters.category.length > 0) {
        query.category = { $in: filters.category };
    }
    if (filters.color && filters.color.length > 0) {
        query.color = { $in: filters.color };
    }
    if (filters.size && filters.size.length > 0) {
        query.size = { $in: filters.size };
    }
    if (filters.price && filters.price.length > 0) {
        const priceRanges = filters.price.map(price => {
            const [min, max] = price.split('-').map(Number);
            return { price: { $gte: min, $lte: max } };
        });
        query.$or = priceRanges;
    }

    return Products.find(query).exec();
}


module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsByName,
    getProductById,
    getProductsByNameStartsWith,
    getFilteredProducts,
};
