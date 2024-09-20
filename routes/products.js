const express = require("express");
const router = express.Router();
const productController = require('../controllers/products')

router.get("/:category", productController.getProductByCategory);

module.exports = router;