const User = require('../models/user');
const Order = require('../models/orders');

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
            return orders;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProfileService(); // Export an instance
