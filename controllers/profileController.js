const profileService = require("../services/profileService");

async function getUserProfile(req, res) {
    // Check if userId exists in session
    const userId = req.session.userId;

    if (!userId) {
        return res.redirect("/login"); // Redirect to login if not logged in
    }

    try {
        const user = await profileService.fetchUserProfile(userId); // Fetch user profile
        const orders = await profileService.getUserOrders(userId); // Fetch user orders

        res.render("profile", { user, orders }); // Render the profile page with user data
    } catch (error) {
        console.error(error);
        if (error.message === 'User not found') {
            return res.status(404).send("User not found");
        }
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getUserProfile,
};
