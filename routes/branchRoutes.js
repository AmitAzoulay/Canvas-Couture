const express = require('express');
const branchController = require('../controllers/branchController');
const router = express.Router();


// Route to get all branches with geocoded coordinates
router.get('/branches', branchController.getBranches);
module.exports = router;