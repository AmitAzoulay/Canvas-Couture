const Product = require('../models/product');
const productService = require("../services/productService");

// Function to render all products as HTML
async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts(); // Fetch products using the service
        res.render('products', { products }); // Render the products.ejs template
    } catch (err) {
        res.status(500).send(err);
    }
}

// Function for live search
async function liveSearch(req, res) {
    const searchTerm = req.params.searchTerm.toLowerCase();
    try {
        const products = await productService.getProductsByNameStartsWith(searchTerm); // Use service for searching
        res.json({ products });
    } catch (error) {
        console.error('Error during live search:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Function to fetch products by category
async function getProductByCategory(req, res) {
    const category = req.params.category;
    try {
        const products = await productService.getProductsByCategory(category); // Fetch products by category
        res.render("products", { products }); // Render with products
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Function to fetch product by name
async function getProductByName(req, res) {
    const name = req.params.name;
    try {
        const products = await productService.getProductsByName(name); // Fetch by name
        const product = products[0];
        res.render("product", { product }); // Render product detail page
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Function to fetch product by ID
async function getProductById(req, res) {
    const product_id = req.params.product_id;
    try {
        const products = await productService.getProductById(product_id); // Fetch by ID
        const product = products[0];
        res.render("product", { product }); // Render product detail page
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function getFilteredProducts(req, res) {
    const filters = req.body; // Get filters from request body
    try {
        const products = await productService.getFilteredProducts(filters);
        res.json({ products });
    } catch (err) {
        console.error('Error fetching filtered products:', err);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getAllProducts,
    liveSearch,
    getProductByCategory,
    getProductByName,
    getProductById,
    getFilteredProducts,
};
