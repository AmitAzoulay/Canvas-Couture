const userService = require("../services/userService");

/**
 * Handle user login.
 */
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const isLoggedIn = await userService.login(email, password);
        if (isLoggedIn.success) {
            const user = isLoggedIn.user;
            req.session.userId = isLoggedIn.user._id;; // Store userId in session
            req.session.isActive = true; //Store isActive in session
            req.session.isAdmin = isLoggedIn.user.isAdmin; //store is admin in session
            console.log('Session after login:', req.session);
            req.user = user;
            res.redirect("/index"); // Redirect to homepage on success
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
        // Ensure that the isAdmin checkbox is handled correctly
        const userData = {
            ...req.body,
            // Use the correct checkbox ID to check if it's selected (true/false)
            isAdmin: req.body.isAdminCheckbox === 'on' // 'on' means the checkbox was checked
        };
        await userService.register(userData);
        // Check if the request came from the admin dashboard
        if (req.url === '/admin/newUser') {
            // Stay on the admin page or show a success message
            res.render('admin', { success: 'User created successfully!' });
        } else {
            // Redirect regular users to the login page after registration
            res.redirect("/login");
        }
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

