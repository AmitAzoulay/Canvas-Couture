const Payments = require("../models/payment")
const Orders = require("../models/orders")
const Products = require("../models/product")

function savePayment(address, cardName, cardNumber, expiryDate, cvv, uid) {

    // Get total price as a promise
    return getTotalPrice(uid)
        .then(totalPrice => {
            if (totalPrice === 0) {
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
                paymentPrice: totalPrice
            });

            // Step 1: Save the payment
            // Step 1: Save the payment
            newPayment.save()
                .then((savedPayment) => {
                    console.log("Payment saved successfully:", savedPayment);
                    // Handle success (e.g., send a response to the client)
                })
                .catch((error) => {
                    console.error("Error saving payment:", error);
                    // Handle error (e.g., send an error response to the client)
                    console.log("failed")
                });
        })
        .then(() => {
            // Step 3: Retrieve the updated orders to get the items
            return Orders.find({ userId: uid, ordered: false });

        })
        .then(() => {
            if (!orders || orders.length === 0) {
                throw new Error("No orders found for the user.");
            }

            const updateStockPromises = [];

            // Step 4: For each order, adjust the stock of each product
            orders.forEach(order => {
                if (order.items && Array.isArray(order.items)) {
                    order.items.forEach(item => {
                        console.log("ssssssssss", item.quantity)
                        const updateStockPromise = Products.updateOne(
                            { _id: item.productId },  // Find the product by ID
                            { $inc: { stock: -item.quantity } }  // Decrease the stock by the quantity ordered
                        );
                        updateStockPromises.push(updateStockPromise);  // Collect the promises
                    });
                }
            });

            if (updateStockPromises.length === 0) {
                throw new Error("No items found in the orders.");
            }

            // Step 5: Execute all stock update operations
            return Promise.all(updateStockPromises);

        })
        .then(orders => {
            // Step 2: Update orders for the user and set them to ordered
            return Orders.updateMany(
                { userId: uid, ordered: false },  // Filter: userId matches, ordered is false
                {
                    $set: {
                        ordered: true,
                        ordered_at: new Date()
                    }
                }
            );

        })
        .then(() => {
            // All operations are successful, return a success message
            return { success: true };
        })
        .catch(error => {
            // Handle errors that may occur during any of the steps
            console.error('Error processing payment, updating orders, or updating stock:', error);
            throw error;  // Re-throw the error to be handled by the controller or the caller
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

const deletePayment = async (paymentId) => {
    try {
        const payment = await Payments.findById(paymentId);

        if (!payment) {
            throw new Error('Payment not found');
        }

        await Payments.deleteOne({ _id: payment._id })
        return { success: true, message: 'Payment deleted successfully' };
    } catch (error) {
        console.error('Error deleting payment:', error.message);
        throw new Error('Failed to delete payment');
    }
};

const getAllPayments = async () => {
    try {
        const payments = await Payments.find(); // Fetch all payment records
        return payments;
    } catch (error) {
        console.error('Error fetching payments:', error.message);
        throw new Error('Failed to fetch payments');
    }
};

const updatePayment = async (paymentId, updateData) => {
    try {
        const payment = await Payments.findById(paymentId);

        if (!payment) {
            throw new Error('Payment not found');
        }

        // Update the fields that are passed
        Object.keys(updateData).forEach((key) => {
            payment[key] = updateData[key];
        });

        await payment.save();
        return { success: true, message: 'Payment updated successfully', payment };
    } catch (error) {
        console.error('Error updating payment:', error.message);
        throw new Error('Failed to update payment');
    }
};

module.exports = {
    savePayment,
    deletePayment,
    getAllPayments,
    updatePayment
};