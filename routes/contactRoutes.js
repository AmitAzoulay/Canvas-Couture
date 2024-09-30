const express = require('express');
const contactController = require('../controllers/contactController');
const router = express.Router();

// GET request to show the contact form
router.get('/', (req, res) => {
    res.render('contact');
});

// POST request to handle form submission
router.post('/Contact', contactController.postContact);

module.exports = router;
