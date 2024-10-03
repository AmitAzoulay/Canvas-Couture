const Product = require('../models/product');
const productService = require("../services/productService");

// Function to render all products as HTML
async function getAllProducts(req, res) {
    try {
        // Fetch products from the database
        const products = await Product.find({});
        res.render('products', { products }); // Render your products.ejs with the products
    } catch (err) {
        res.status(500).send(err);
    }
}
async function getAllProductsAPI(req, res) {
    const searchTerm = req.query.term || '';
    try {
        const products = await Product.find({
            name: { $regex: searchTerm, $options: 'i' } // Case-insensitive search
        });
        res.json({ products });
    } catch (err) {
        res.status(500).send(err);
    }
}

// Function to fetch all products as JSON
async function getAllProductsJSON(req, res) {
    try {
        const searchTerm = req.query.term || '';
        const products = searchTerm ? await Product.find({ name: { $regex: searchTerm, $options: 'i' } }) : await Product.find({});
        res.json({ products });
    } catch (err) {
        res.status(500).send(err);
    }
}

function getProductByCategory(req, res) {
    const category = req.params.category;
    productService.getProductsByCategory(category)
        .then(products => {
            res.render("../views/products.ejs", { products, category });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        });
}

function getProductByName(req, res) {
    const name = req.params.name;
    productService.getProductsByName(name)
        .then(products => {
            const product = products[0];
            res.render("../views/product.ejs", { product, name });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        });
}

function getProductById(req, res) {
    const product_id = req.params.product_id;
    productService.getProductById(product_id)
        .then(products => {
            const product = products[0];
            res.render("../views/product.ejs", { product, product_id });
        })
        .catch(error => {
            console.error('Error fetching product:', error);
            res.status(500).send('Internal Server Error');
        });
}

// New function for live search
function liveSearch(req, res) {
    const searchTerm = req.params.searchTerm.toLowerCase();
    productService.getProductsByNameStartsWith(searchTerm)
        .then(products => {
            res.json({ products });
        })
        .catch(error => {
            console.error('Error during live search:', error);
            res.status(500).send('Internal Server Error');
        });
}

module.exports = {
    getAllProducts,
    getAllProductsAPI,
    getAllProductsJSON, // Don't forget to export this new function
    getProductByCategory,
    getProductByName,
    getProductById,
    liveSearch,
};
