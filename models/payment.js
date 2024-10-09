const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    },
    cardName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String, // MM/YY format
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    paymentPrice: {
        type: Number,
        required: true
    }
});

// Export the Payment model
const Payments = mongoose.model('Payments', paymentsSchema);
module.exports = Payments;
