const paymentService = require("../services/payment")


function getPaymentPage(req, res) {
    res.render("../views/payment.ejs", {});
}

function savePayment(req, res) {
    const { address, cardName, cardNumber, expiryDate, cvv } = req.body;
    const userId = req.session.userId; //'66ef0ad7b04e00e79c37018b' // Get user ID from session

    if (!userId) {
        return res.status(400).send('User ID is required'); // Handle the case when user ID is not present
    }

    try {
        paymentService.savePayment(address, cardName, cardNumber, expiryDate, cvv, userId);
        res.redirect("/");
    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getPaymentPage,
    savePayment
}