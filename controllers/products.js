const productService = require("../services/product")

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

module.exports = {
    getProductByCategory
}