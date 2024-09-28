const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: false,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    address: {
      type: {
        street: { type: String, required: true, trim: true },
        number: { type: String, required: true, trim: true },
        apartment: { type: String, trim: true }, // Optional field
        city: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
      },
      validate: {
        validator: function (v) {
          // Only validate address if it is provided (not null or undefined)
          return v == null || (v.street && v.house_number && v.city && v.country);
        },
        message: "All address fields (street, house_number, city, and country) are required if address is provided.",
      },
    },
  },
  {
    versionKey: false // Disable the version key
  }
);

module.exports = mongoose.model("User", userSchema);