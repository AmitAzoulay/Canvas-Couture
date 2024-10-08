const orderService = require("../services/orderService")

async function getCurrentCart(req, res) {

    uid = req.session.userId
    orderService.getCurrentCart(uid)
        .then(cart => {
            res.render("../views/cart.ejs", { cart });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        });
}

async function removeCartItem(req, res) {
    const { orderId, productId } = req.params;
    try {
        const result = await orderService.removeCartItem(orderId, productId);
        uid = req.session.userId

        res.status(200).json(result); // Respond with a success message
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
}

async function addToCartById(req, res) {
    console.log(req.params.quantity)
    const productId = req.params.productId;
    const quantity = req.params.quantity
    const uid = req.session.userId
    try {
        const result = await orderService.addToCartById(uid, productId, quantity);
        res.status(200).json(result); // Respond with a success message
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
}

module.exports = {
    getCurrentCart,
    removeCartItem,
    addToCartById
}