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

module.exports = {
    getCurrentCart
}