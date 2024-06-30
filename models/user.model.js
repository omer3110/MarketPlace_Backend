const mongoose = require("mongoose");

// Create a schema
const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, // Passwords should be stored as strings (hashed)
      required: true,
    },
    firstName: {
      type: String, // First and last names should be stored as strings
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usersSchema);
module.exports = User;
