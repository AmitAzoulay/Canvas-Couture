const orderService = require('../services/orderService');

async function addToCart(req, res) {
    const { productId, quantity, size } = req.body; // Get data from the request
    const userId = req.session.userId; // Get the user ID from the session

    try {
        const order = await orderService.addToCart(userId, productId, quantity, size);
        res.status(200).json({ message: "Product added to cart", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

async function getOrderPage(req, res) {
    const userId = req.session.userId; // Get the user ID from the session

    try {
        const cartItems = await orderService.getCartItems(userId); // Fetch cart items from the service
        res.render("order", { cartItems }); // Pass cartItems to the view
    } catch (error) {
        console.error("Error fetching order page:", error);
        res.status(500).render('error', { message: error.message }); // Handle error rendering
    }
}

module.exports = {
    addToCart,
    getOrderPage,
};
