const express = require("express");
const router = express.Router();
const orderController = require('../controllers/ordersController')

router.get("/", orderController.getAllOrdersOfUser_controller);

module.exports = router;