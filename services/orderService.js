const Orders = require("../models/orders")
const Products = require("../models/product")
const mongoose = require('mongoose');

async function getAllOrdersOfUser(uid) {

    const uid_as_object = new mongoose.Types.ObjectId(uid);
    //const orders = await Orders.find({ email }); new mongoose.Types.ObjectId('66df5accc1d6b1eae2660677')//eeee
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
    orders = await Orders.find({ userId: uid_as_object, ordered: false })

    if (!orders || orders.length === 0) {
        // If no cart exists, create a new one
        orders = new Orders({
            _id: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId(uid),
            items: [],
            orderDate: new Date(), //placeholder
            status: 'Pending',
            ordered: false,
        });
        await orders.save();
    }
    orders = await Orders.find({ userId: uid_as_object, ordered: false })
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
            throw new Error('Order not found');
        }

        // Find the item in the order
        const item = order.items.find(i => i.productId.toString() === productId);
        if (!item) {
            throw new Error('Item not found in the cart');
        }

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

async function addToCartById(uid, productId, quantityOfProduct) {

    quantityOfProduct = parseInt(quantityOfProduct, 10);
    const product = await Products.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }

    // Find the existing order for the user
    let order = await Orders.findOne({ userId: new mongoose.Types.ObjectId(uid), ordered: false });

    if (!order) {
        // If no cart exists, create a new one
        order = new Orders({
            _id: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId(uid),
            items: [],
            orderDate: new Date(), // Placeholder
            status: 'Pending',
            ordered: false,
        });
    }

    // Check if the product already exists in the cart items
    const existingItem = order.items.find(item => item.productId.toString() === productId);

    // Debugging existing item
    if (existingItem) {
        const totalQuantity = existingItem.quantity + quantityOfProduct;
        if (totalQuantity > product.stock) {
            throw new Error(`Not enough stock. Available stock: ${product.stock}`);
        }
        // If the item exists and stock is available, increase the quantity
        existingItem.quantity = totalQuantity;
    } else {
        // If the item does not exist, add it to the items array
        order.items.push({
            productId: product._id,
            name: product.name, // Use the product name from the fetched product
            price: product.price, // Use the product price from the fetched product
            quantity: quantityOfProduct
        });
    }

    // Save the updated order
    await order.save();

    return order;
}

module.exports = {
    getAllOrdersOfUser,
    getCurrentCart,
    removeCartItem,
    addToCartById
};