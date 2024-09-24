const express = require("express");
const router = express.Router();
const productController = require('../controllers/index')

router.get("/", productController.getIndex)

// Route for the about us page
router.get("/aboutus", (req, res) => {
    res.render("aboutus"); // Render the login view
});

module.exports = router;