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
        console.log(address);
        // Render the profile page with user data, regardless of orders or address
        res.render("profile", {
            user,
            orders: orders || [], // Pass an empty array if no orders
            
            address: address || "No address found" // Default message if no address
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getUserProfile,
};