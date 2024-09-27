const express = require("express");
const router = express.Router();
const orderController = require('../controllers/ordersController')

router.get("/", orderController.getCurrentCart);
router.delete('/remove/:orderId/:productId', orderController.removeCartItem);
router.post('/add/:productId', orderController.addToCartById);

module.exports = router;