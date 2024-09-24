const productService = require("../services/productService")

function getProductByCategory(req, res) {
    const category = req.params.category
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
    const name = req.params.name
    productService.getProductsByName(name)
        .then(products => {
            res.render("../views/product.ejs", { products, name });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        });
}

module.exports = {
    getProductByCategory,
    getProductByName
}