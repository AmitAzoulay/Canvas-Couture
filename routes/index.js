const express = require("express");
const express = require('express');
const { isLoggedIn } = require('./middleware/authMiddleware');
const router = express.Router();

// Protected route for the homepage
router.get('/index', isLoggedIn, (req, res) => {
    res.render('index', { user: req.session.user });
});

// Export the router
module.exports = router;
