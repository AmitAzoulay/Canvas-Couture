const userService = require("../services/userService");

/**
 * Handle user login.
 */
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const isLoggedIn = await userService.login(email, password);
        if (isLoggedIn.success) {
            req.session.email = email; // Store email in session
            res.redirect("/dashboard"); // Redirect to dashboard on success
        } else {
            res.status(401).render("login", { error: isLoggedIn.message }); // Render login view with error
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).render("login", { error: "An error occurred. Please try again." });
    }
}

/**
 * Handle user registration.
 */
async function registerUser(req, res) {
    try {
        await userService.register(req.body);
        res.redirect("/login"); // Redirect to login page after successful registration
    } catch (error) {
        res.status(400).render("register", { error: error.message }); // Render register view with error
    }
}

module.exports = {
    loginUser,
    registerUser,
};