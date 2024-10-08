const express = require("express");
const router = express.Router();
const paymentController = require('../controllers/paymantController')

router.get("/", paymentController.getPaymentPage);
router.post('/checkout', paymentController.savePayment);

module.exports = router;