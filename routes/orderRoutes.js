const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route to get the shopping cart (order) page
router.get("/", orderController.getOrderPage); 

// Route to add items to the cart
router.post("/add-to-cart", orderController.addToCart); 

module.exports = router;
