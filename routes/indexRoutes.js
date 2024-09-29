const express = require('express');
const { isLoggedIn } = require('../middleware/authMiddleware');
const router = express.Router();
const productController = require('../controllers/indexController')
const aboutusController = require('../controllers/aboutusController')

router.get("/", productController.getIndex)

// Route for the about us page
router.get("/aboutus", aboutusController.getAboutus)

// Protected route for the homepage
router.get('/index', isLoggedIn, (req, res) => {
    res.render('index', { user: req.session.user });
});


// Export the router
module.exports = router;