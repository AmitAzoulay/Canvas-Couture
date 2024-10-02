const productService = require("../services/productService");

function getAllProducts(req, res) {
    productService.getAllProducts()
        .then(products => {
            res.render("../views/products.ejs", { products });
        })
        .catch(error => {
            console.error('Error fetching all products:', error);
            res.status(500).send('Internal Server Error');
        });
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
    getProductByCategory,
    getProductByName,
    getProductById,
    liveSearch
};
