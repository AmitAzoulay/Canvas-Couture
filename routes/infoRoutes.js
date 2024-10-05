const express = require("express");
const router = express.Router();
const infoController = require('../controllers/infoController')

router.post("/getweather", infoController.getInfoData);
router.get("/", (req, res) => {
    res.render("info", { weather: false }); // Ensure this matches your EJS file name
});

module.exports = router;