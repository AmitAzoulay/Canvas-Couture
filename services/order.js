const Orders = require("../models/orders")
const mongoose = require('mongoose');

async function getAllOrdersOfUser(uid) {

    //const orders = await Orders.find({ email }); new mongoose.Types.ObjectId('66df5accc1d6b1eae2660677')
    const orders = await Orders.find({ userId: uid })

    if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
    }
    // Format the data to include product details from each order
    const formattedOrders = orders.map(order => ({
        orderId: order._id,
        orderDate: order.orderDate,
        status: order.status,
        items: order.items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }))
    }));

    return formattedOrders;


}

module.exports = {
    getAllOrdersOfUser
};