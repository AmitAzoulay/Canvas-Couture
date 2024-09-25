const express = require("express");
const router = express.Router();
const productController = require('../controllers/products')

router.get("/search/category/:category", productController.getProductByCategory);
router.get("/search/name/:name", productController.getProductByName);
router.get("/search/product_id/:product_id", productController.getProductByName);

module.exports = router;