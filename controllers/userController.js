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
    console.log("Incoming User Data:", req.body); // Log incoming data
    console.log("Is coming from admin:", req.body.isAdmin);

    try {
        await userService.register(req.body);
        if (req.body.isAdmin == "true") {
            console.log("admin: ", req.body.isAdmin)
            res.render("login", { success: "RESOLVED!!! - Added New Admin" });
        }
        else {
            res.redirect("/login");
        }

    } catch (error) {
        if (req.body.isAdmin) {
            // Respond with JSON in case of errors for admin requests
            return res.json({ success: false, message: error.message });
        } else {
            // Render registration page with the error for regular users
            res.status(400).render("register", { error: error.message });
        }
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
        return res.render("change-password", { error: "Passwords do not match." });
    }

    try {
        const result = await userService.updatePassword(email, newPassword);
        console.log("result:", result)
        console.log("Ses id: ", req.session.userId)
        // Pass success message to the change-password view
        if (result._id != req.session.userId) {
            res.render("login", { success: "RESOLVED!!! - CHANGE PASSWORD TO OTHER USER" });
        }
        else {
            res.render("login", { success: "Password changed successfully. Please log in with your new password." });
        }

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