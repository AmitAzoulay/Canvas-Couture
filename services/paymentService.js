const Payments = require("../models/payment")
const Orders = require("../models/orders")

function savePayment(address, cardName, cardNumber, expiryDate, cvv, uid) {

    // Get total price as a promise
    return getTotalPrice(uid) // Assuming this is an async function returning a promise
        .then(totalPrice => {
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

    console.log(uid); // Log the user ID for debugging

    // Fetch orders where ordered is false
    const orders = await Orders.find({ userId: uid, ordered: false });
    console.log(orders); // Log the orders retrieved for debugging

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

    console.log(totalPrice.toFixed(2)); // Log the total price for debugging
    return totalPrice.toFixed(2); // Returns the total price formatted to two decimal places
}
module.exports = {
    savePayment
};