const orderService = require("../services/order")

async function getAllOrdersOfUser_controller(req, res) {

    orderService.getAllOrdersOfUser()
        .then(orders => {
            res.render("../views/orders.ejs", { orders });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        });
    //email = req.session.email



    // Log the result to check if orders are being fetched
    /* 
     const result = await orderService.getAllOrdersOfUser();
    console.log(result.status);
 
     if (result.status === 200) {
         // Render your EJS view and pass the data
         return res.render('orders', { orders: result.data });
     } else {
         // If no orders, return an error message in the view
         console.log("ffffffffffffffffffffffffffffff")
         return res.status(result.status).json({ message: result.message });
     }*/
}

module.exports = {
    getAllOrdersOfUser_controller
}