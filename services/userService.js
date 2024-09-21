const User = require("../models/user");
const bcrypt = require("bcrypt");

async function login(email, password) {
    const user = await(User.findOne({email}));
    if (!user) {
        return { success: false, message: "Invalid email or password." }
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
        return { success: false, message: "Invalid email or password." };
    }

    return { success: true };
}

async function register(userData) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email already in use.");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        password: hashedPassword,
        //password: userData.password,
        isAdmin: userData.isAdmin || false,
    });

    try {
        await newUser.save();
    } catch (error) {
        throw new Error("Failed to register user.");
    }
}

module.exports = {
    login,
    register,
};