const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middleware/authMiddleware");

// Route for the root path
router.get("/", (req, res) => {
    res.redirect("/login"); // Redirect to the login page
});

// Route for serving the login page
router.get("/login", (req, res) => {
    res.render("login"); // Render the login view
});

// Route for logging in
router.post("/login", userController.loginUser);

// Route for serving the registration page
router.get("/register", (req, res) => {
    res.render("register"); // Render the registration view
});

// Route for registering a new user
router.post("/register", userController.registerUser);

// Protected route that requires the user to be logged in
router.get("/dashboard", isLoggedIn, (req, res) => {
    console.log("Accessing dashboard...");
    res.render("dashboard"); // Render the dashboard view
});

module.exports = router;
