const User = require('../models/user');
const Order = require('../models/orders');
const Payments = require('../models/payment');

class ProfileService {
    async fetchUserProfile(userId) { // Renamed
        try {
            const user = await User.findById(userId).exec();
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserOrders(userId) {
        try {
            // Fetch only orders that are marked as ordered: true
            const orders = await Order.find({ userId, ordered: true }).populate('items.productId').exec();
            console.log("Orders fetched of service:", orders);
            orders.forEach(order => {
                console.log("Order items:", order.items);
            });
            return orders;
        } catch (error) {
            throw error;
        }
    }
    

    async getUserAddress(userId) {
        try {
            const paymentDetails = await Payments.findOne({ userId }).exec();
            return paymentDetails ? paymentDetails.address : null; // Return null if not found
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProfileService(); // Export an instance
