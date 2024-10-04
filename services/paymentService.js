const Payments = require("../models/payment")
const Orders = require("../models/orders")
const Products = require("../models/product")

function savePayment(address, cardName, cardNumber, expiryDate, cvv, uid) {

    // Get total price as a promise
    return getTotalPrice(uid) // Assuming this is an async function returning a promise
        .then(totalPrice => {

            // Check if the total price is 0
            if (totalPrice === 0) {
                // Return a suitable message or handle accordingly
                return Promise.reject(new Error("Payment not committed: No items in the cart or total price is zero."));
            }
            const newPayment = new Payments({
                userId: uid,
                address,
                cardName,
                cardNumber,
                expiryDate,
                cvv,
                ordered_at: new Date(),
                paymentPrice: totalPrice // Use the resolved value of totalPrice
            });
            Orders.updateMany(
                { userId: uid, ordered: false },  // Filter: userId matches, ordered is false
                {
                    $set: {
                        ordered: true,  // Set ordered to true
                        ordered_at: new Date()  // Set the current date as the ordered_at date
                    }
                }
            );
            // Step 1: Save the payment
            return newPayment.save();
        })
        .then(() => {
            // Step 2: Update the orders for the user
            return Orders.updateMany(
                { userId: uid, ordered: false },  // Filter: userId matches, ordered is false
                {
                    $set: {
                        ordered: true,  // Set ordered to true
                        ordered_at: new Date()  // Set the current date as the ordered_at date
                    }
                }
            );
        })
        .then(result => {
            // Return success and the number of updated orders
            return { success: true, updatedOrdersCount: result.nModified };
        })
        .catch(error => {
            // Handle errors here
            console.error('Error processing payment and updating orders:', error);
            throw error; // Pass the error up to be handled by the controller
        });
}

async function getTotalPrice(uid) {

    // Fetch orders where ordered is false
    const orders = await Orders.find({ userId: uid, ordered: false });

    // If no orders found, return 0
    if (!orders || orders.length === 0) {
        return 0;
    }

    let totalPrice = 0;

    // Loop through each order and calculate total price
    orders.forEach(order => {
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                totalPrice += item.price * item.quantity; // Calculate total price
            });
        }
    });

    return totalPrice.toFixed(2); // Returns the total price formatted to two decimal places
}
module.exports = {
    savePayment
};