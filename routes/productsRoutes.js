const express = require("express");
const router = express.Router();
const productController = require('../controllers/productsController')

//router.get("/search/all", productController.getAllProductsAPI);
router.get("/search/category/:category", productController.getProductByCategory);
router.get("/search/name/:name", productController.getProductByName);
router.get("/search/product/:product_id", productController.getProductById);

// Route to get all products and render the page
router.get('/', productController.getAllProducts);

// API route to fetch all products as JSON
router.get('/search/all', productController.getAllProducts);

// API route for live search
router.get('/search/live/:searchTerm', productController.liveSearch);

router.post('/search/filtered', productController.getFilteredProducts);

module.exports = router;