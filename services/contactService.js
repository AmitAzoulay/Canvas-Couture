const Contact = require('../models/Contact');
const Users = require('../models/user');
const mongoose = require('mongoose');
exports.storeContact = async (uid, message) => {

    const uid_as_object = new mongoose.Types.ObjectId(uid);
    //const orders = await Orders.find({ email }); new mongoose.Types.ObjectId('66df5accc1d6b1eae2660677')
    const user = await Users.findOne({ _id: uid_as_object })

    // Ensure user is found before proceeding
    if (user) {
        const contact = new Contact({ email: user.email, message });
        await contact.save(); // Save the contact data to the database
    } else {
        console.error('User not found');
        throw new Error('User not found');
    }
};
