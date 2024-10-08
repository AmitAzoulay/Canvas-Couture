const paymentService = require("../services/paymentService")


function getPaymentPage(req, res) {
    res.render("../views/payment.ejs", { successMessage: "" });
}

function savePayment(req, res) {
    const { address, cardName, cardNumber, expiryDate, cvv } = req.body;
    const userId = req.session.userId; //'66ef0ad7b04e00e79c37018b' // Get user ID from session

    if (!userId) {
        return res.status(400).send('User ID is required'); // Handle the case when user ID is not present
    }
    console.log(address, cardName, cardNumber, expiryDate, cvv)
    try {
        paymentService.savePayment(address, cardName, cardNumber, expiryDate, cvv, userId);
        res.render("../views/payment.ejs", {
            successMessage: "Payment has been successfully completed!"
        });
    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getAllPayments = async (req, res) => {
    console.log("aaaaaaaaaaaa")
    try {
        const payments = await paymentService.getAllPayments();
        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error('Error in getAllPayments controller:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching payments' });
    }
};

const updatePayment = async (req, res) => {
    const { paymentId } = req.params;
    const updateData = req.body; // Expecting the fields to be updated in req.body

    try {
        const result = await paymentService.updatePayment(paymentId, updateData);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in updatePayment controller:', error.message);
        res.status(500).json({ success: false, message: 'Error updating payment' });
    }
};


const deletePayment = async (req, res) => {
    const { paymentId } = req.params;
    console.log("alino kmo geshem")

    try {
        const result = await paymentService.deletePayment(paymentId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in deletePayment controller:', error.message);
        res.status(500).json({ success: false, message: 'Error deleting payment' });
    }
};

module.exports = {
    getPaymentPage,
    savePayment,
    getAllPayments,
    updatePayment,
    deletePayment
}