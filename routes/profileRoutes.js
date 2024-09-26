const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// No need for isLoggedIn since users can only reach this after logging in
router.get("/profile", profileController.getUserProfile);

module.exports = router;
