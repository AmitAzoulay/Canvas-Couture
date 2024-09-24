const express = require("express");
const router = express.Router();
const paymentController = require('../controllers/paymant')

router.get("/", paymentController.getPaymentPage);

module.exports = router;