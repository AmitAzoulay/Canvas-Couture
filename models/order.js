const mongoose = require('mongoose');

// Define the schema for an order
const orderSchema = new mongoose.Schema(
    {
    "_id": mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    products: [
        {
            "productId": mongoose.Schema.Types.ObjectId,
            "name": String,
            "price": Number,
            "quantity": Number,
            "size": String,
        }
    ],
    orderDate: {
        type: Date,
        default: Date.now, 
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'], // Possible order statuses
        default: 'pending', 
    },

    orderCompleted: {
        type: Boolean,
        default: false, // Default to false
    },
});

// Create the Order model based on the schema
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;