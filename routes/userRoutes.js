const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middleware/authMiddleware");

// Route for the root path which is the login page
router.get("/", (req, res) => {
    res.redirect("/login"); // Redirect to the loin page
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

// Route for serving the homepage (accessible to everyone)
router.get('/index', isLoggedIn, (req, res) => {
    console.log("Accessing homepage...");
    res.render("index", { isLoggedIn: !!req.session.userId }); // Pass login status to the homepage
});

// Route for serving index
router.get("/index", (req, res) => {
    console.log("Accessing index...");
    res.render("index", { isLoggedIn: !!req.session.userId }); // Pass login status to the dashboard
});

// Protected route for logging out
router.post("/logout", isLoggedIn, userController.logoutUser, (req, res) => {
    res.redirect("/login"); // Redirect to login page after logout
});

// Route to display the change password page
router.get("/change-password", (req, res) => {
    res.render("change-password"); // Ensure this matches your EJS file name
});

// Route to handle password change submission
router.post("/change-password", userController.changePassword);


module.exports = router;