const orderService = require("../services/order")

async function getAllOrdersOfUser_controller(req, res) {

    uid = req.session.userId
    orderService.getAllOrdersOfUser(uid)
        .then(orders => {
            res.render("../views/orders.ejs", { orders });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        });
}

module.exports = {
    getAllOrdersOfUser_controller
}