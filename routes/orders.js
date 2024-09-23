const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orders')

router.get("/", orderController.getAllOrdersOfUser_controller);

module.exports = router;