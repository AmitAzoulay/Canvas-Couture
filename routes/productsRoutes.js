const express = require("express");
const router = express.Router();
const productController = require('../controllers/productsController')

router.get("/search/all", productController.getAllProducts);
router.get("/search/category/:category", productController.getProductByCategory);
router.get("/search/name/:name", productController.getProductByName);
router.get("/search/product/:product_id", productController.getProductById);

// New route for live search
router.get("/search/live/:searchTerm", productController.liveSearch);

module.exports = router;