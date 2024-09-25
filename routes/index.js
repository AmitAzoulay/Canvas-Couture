const express = require("express");
const router = express.Router();
const productController = require('../controllers/index')
const aboutusController = require('../controllers/aboutusController')

router.get("/", productController.getIndex)

// Route for the about us page
router.get("/aboutus", aboutusController.getAboutus)

module.exports = router;