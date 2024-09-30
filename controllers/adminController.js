const adminService = require('../services/adminService');

// Controller function to get all products
async function getAllProducts(req, res) {
    console.log("Accessed /admin/products");
    try {
        // Fetch all products from the service
        const products = await adminService.getAllProducts();
        console.log("fetched all prods")
        // Render the EJS view and pass the 'products' array to the view
        res.status(200).render('admin', { products });
    } catch (error) {
        console.log("error all prods")
        res.status(500).send('Error retrieving products');
    }
};
// Add a new product
async function addProduct (req, res) {
    const { product_id, name, category, color, size, price, stock, short_description } = req.body;

    try {
        await adminService.addProduct({
            product_id, name, category, color, size, price, stock, short_description
        });
        res.redirect('/admin/products');
    } catch (error) {
        res.status(500).send('Error adding product');
    }
};
module.exports = {
    getAllProducts,
    addProduct
}