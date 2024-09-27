const Orders = require("../models/orders")
const mongoose = require('mongoose');

async function getAllOrdersOfUser(uid) {

    const uid_as_object = new mongoose.Types.ObjectId(uid);
    //const orders = await Orders.find({ email }); new mongoose.Types.ObjectId('66df5accc1d6b1eae2660677')
    const orders = await Orders.find({ userId: uid_as_object })

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

async function getCurrentCart(uid) {

    const uid_as_object = new mongoose.Types.ObjectId(uid);
    //const orders = await Orders.find({ email }); new mongoose.Types.ObjectId('66df5accc1d6b1eae2660677')
    const orders = await Orders.find({ userId: uid_as_object, ordered: false })

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

async function removeCartItem(orderId, productId) {
    try {
        // Find the order first
        const order = await Orders.findById(orderId);
        if (!order) {
            console.log("Order not found")
            throw new Error('Order not found');
        }

        // Find the item in the order
        const item = order.items.find(i => i.productId.toString() === productId);
        if (!item) {
            throw new Error('Item not found in the cart');
        }

        console.log("quantity:", item.quantity)

        // Check the quantity
        if (item.quantity > 1) {
            // Decrease the quantity by 1
            item.quantity -= 1;
            await order.save(); // Save the updated order
            return { message: 'Item quantity decreased by 1' };
        }
        else {
            // Remove the item from the cart
            await Orders.updateOne(
                { _id: orderId },
                { $pull: { items: { productId: new mongoose.Types.ObjectId(productId) } } }
            );
            return { message: 'Item removed from cart' };
        }
    } catch (error) {
        console.error('Error modifying item in cart:', error);
        throw new Error('Failed to modify item in cart');
    }
}

module.exports = {
    getAllOrdersOfUser,
    getCurrentCart,
    removeCartItem
};