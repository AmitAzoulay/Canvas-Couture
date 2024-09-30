const Contact = require('../models/Contact');

exports.storeContact = async (email, message) => {
    const contact = new Contact({ email, message });
    await contact.save(); // Save the contact data to the database
};
