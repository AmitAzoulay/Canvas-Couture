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
            const orders = await Order.find({ userId }).populate('items.productId').exec();
            console.log("Orders fetched of service:", orders); // This logs the fetched orders
            orders.forEach(order => {
                console.log("Order items:", order.items); // This logs the items of each order
            });
            return orders;
        } catch (error) {
            throw error;
        }
    }
    

    async getUserAddress(userId) { 
        try {
            const paymentDetails = await Payments.findOne({ userId }).exec();
            if (!paymentDetails) {
                throw new Error('Payment details not found');
            }
            return paymentDetails.address;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProfileService(); // Export an instance
