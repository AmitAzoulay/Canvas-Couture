const mongoose = require('mongoose');


// Define the schema for an order
const orderSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "userId": mongoose.Schema.Types.ObjectId,
    "items": [
        {
            "productId": mongoose.Schema.Types.ObjectId,
            "name": String,
            "price": Number,
            "quantity": Number
        }
    ],
    "orderDate": Date,
    "status": String,
});

// Create the Order model based on the schema
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;