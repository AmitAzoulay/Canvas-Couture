const express = require("express");
const router = express.Router();
const orderController = require('../controllers/ordersController')

router.get("/", orderController.getCurrentCart);

module.exports = router;