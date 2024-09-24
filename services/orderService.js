const Order = require('../models/order'); // Adjust the path if necessary
const Product = require('../models/product'); // Assuming you have a Product model

async function addToCart(userId, productId, quantity, size) {
    // Find the user's current cart
    let order = await Order.findOne({ userId, orderCompleted: false });

    // If no cart exists, create one
    if (!order) {
        order = new Order({
            userId,
            products: [],
            orderCompleted: false,
        });
    }

    // Check if the product is already in the cart
    const existingProductIndex = order.products.findIndex(product => product.productId.toString() === productId);

    if (existingProductIndex > -1) {
        // If it exists, update the quantity
        order.products[existingProductIndex].quantity += quantity;
    } else {
        // If it doesn't exist, add the new product
        const productDetails = await Product.findById(productId); // Fetch product details
        if (!productDetails) {
            throw new Error("Product not found.");
        }

        order.products.push({
            productId,
            name: productDetails.name,
            price: productDetails.price,
            quantity,
            size,
        });
    }

    // Save the updated order (cart) to the database
    await order.save();
    return order; // Return the updated cart
}

async function getOrderByUserId(userId) {
    try {
        // Fetch the order for the user
        const order = await Order.findOne({ userId }); // Adjust query based on your needs
        return order;
    } catch (error) {
        throw new Error("Failed to retrieve order data.");
    }
}

async function getCartItems(userId) {
    const order = await Order.findOne({ userId, orderCompleted: false });
    return order ? order.products : []; // Return products if the order exists, else return an empty array
}

module.exports = {
    addToCart,
    getOrderByUserId,
    getCartItems,
};




/* Amit's function - still not in using 
async function getAllOrdersOfUser(uid) {

    //const orders = await Orders.find({ email }); new mongoose.Types.ObjectId('66df5accc1d6b1eae2660677')
    const orders = await Orders.find({ userId: uid , ordered: true})

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
*/

