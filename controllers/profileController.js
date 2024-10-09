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

        // Render the profile page with user data
        res.render("profile", {
            user,
            orders: orders || [], // Pass an empty array if no orders
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getUserProfile,
};