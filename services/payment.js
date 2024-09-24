const Payments = require("../models/payment")

function savePayment(address, cardName, cardNumber, expiryDate, cvv, uid) {
    return new Promise(async (resolve, reject) => {
        try {
            const payment = new Payments({
                userId: uid,
                address,
                cardName,
                cardNumber,
                expiryDate,
                cvv,
                createdAt: new Date()
            });

            await payment.save();  // Save to database
            resolve(payment); // Resolve with the saved payment object
        } catch (error) {
            console.error('Error saving payment:', error);
            reject(error); // Reject the promise on error
        }
    });
}

module.exports = {
    savePayment
};