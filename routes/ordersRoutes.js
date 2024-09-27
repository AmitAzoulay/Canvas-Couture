const express = require("express");
const router = express.Router();
const orderController = require('../controllers/ordersController')

router.get("/", orderController.getCurrentCart);
router.delete('/remove/:orderId/:productId', orderController.removeCartItem);

module.exports = router;