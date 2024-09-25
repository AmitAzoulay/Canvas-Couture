const User = require("../models/user");
const bcrypt = require("bcrypt");

async function login(email, password) {
    const user = await (User.findOne({ email }));
    if (!user) {
        return { success: false, message: "Invalid email or password." }
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
        return { success: false, message: "Invalid email or password." };
    }

    // Set isActive to true
    user.isActive = true;
    await user.save();

    return { success: true, user };
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
        isAdmin: userData.isAdmin || false,
        isActive: false
    });

    try {
        await newUser.save();
    } catch (error) {
        throw new Error("Failed to register user.");
    }
}

async function logout(userId) {
    try {
        const user = await User.findById(userId);
        if (user) {
            user.isActive = false; // Set isActive to false
            await user.save(); // Save changes to the database
        }
        return true; // Indicate success
    } catch (error) {
        console.error("Error logging out user:", error);
        throw new Error("Unable to log out user.");
    }
}

async function updatePassword(email, newPassword) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found. Please register.");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
}


module.exports = {
    login,
    register,
    logout,
    updatePassword,
};