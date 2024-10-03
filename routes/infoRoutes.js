const express = require("express");
const router = express.Router();
const infoController = require('../controllers/infoController')

router.get("/", infoController.getAllStatistics);

module.exports = router;