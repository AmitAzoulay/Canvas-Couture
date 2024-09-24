const userService = require("../services/userService");

/**
 * Handle user login.
 */
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const isLoggedIn = await userService.login(email, password);
        if (isLoggedIn.success) {
            req.session.userId =  isLoggedIn.user._id;// Store userId in session
            req.session.isActive = true; //Store isActive in session
            res.redirect("/index"); // Redirect to dashboard on success // Y: why not redirect to index?
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

/**
 * Handle user logout.
 */
async function logoutUser(req, res) {
    try {
        // Call the logout service
        await userService.logout(req.session.userId);
        
        req.session.destroy(); // Destroy the session
        res.redirect("/login"); // Redirect to login page
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during logout.");
    }
}

async function changePassword(req, res) {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }

    try {
        const result = await userService.updatePassword(email, newPassword);
        res.send("Password changed successfully.");
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    changePassword,
};

