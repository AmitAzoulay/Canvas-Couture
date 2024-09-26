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
        const address = await profileService.getUserAddress(userId); // Fetch the address

        console.log("Orders fetched of controller:", orders);

        res.render("profile", { user, orders, address }); // Render the profile page with user data
    } catch (error) {
        console.error(error);
        if (error.message === 'User not found' || error.message === 'Payment details not found') {
            return res.status(404).send("User or payment details not found");
        }
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getUserProfile,
};
