const contactService = require('../services/contactService');

const postContact = async (req, res) => {
    console.log('postContact function called');
    const { email, message } = req.body;

    try {
        const uid = req.session.userId
        await contactService.storeContact(uid, message);
        res.redirect('/index');
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong. Please try again later.');
    }
};


module.exports = {
    postContact
};
