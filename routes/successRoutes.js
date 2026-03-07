const express = require('express');
const successController = require('../controllers/successController');
const router = express.Router();

router.post('/', successController.successPage);

module.exports = router;
