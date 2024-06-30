const User = require("../models/user.model");

async function getUsers(req, res) {
  const username = req.query.username || "";
  const firstName = req.query.firstName || "";
  const lastName = req.query.lastName || "";

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit || 0;

  const query = {
    username: { $regex: username, $options: "i" },
    firstName: { $regex: firstName, $options: "i" },
    lastName: { $regex: lastName, $options: "i" },
  };

  try {
    const users = await User.find(query).skip(skip).limit(limit);
    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      users,
      currentPage: page,
      totalPages: totalPages,
      totalUsers: total,
    });
  } catch (err) {
    console.log("user.controller, getUsers. Error while getting users", err);
    res.status(500).json({ message: err.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      console.log(
        `user.controller, getUserById. User not found with id: ${id}`
      );
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(`user.controller, getUserById. Invalid user ID: ${id}`);
      return res.status(404).json({ message: "User not found" });
    }
    console.log(
      `user.controller, getUserById. Error while getting user with id: ${id}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      console.log(`user.controller, deleteUser. User not found with id: ${id}`);
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(
      `user.controller, deleteUser. Error while deleting user with id: ${id}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}

async function createUser(req, res) {
  const userToAdd = req.body;
  const newUser = new User(userToAdd);
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User added", user: savedUser });
  } catch (err) {
    console.log("user.controller, createUser. Error while creating user");
    if (err.name === "E11000") {
      // Mongoose validation error
      console.log(`user.controller, createUser. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`user.controller, createUser. ${err.message}`);
      res.status(500).json({ message: "Server error while creating user" });
    }
  }
}

async function editUser(req, res) {
  const { id } = req.params;
  const { username, password, firstName, lastName } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password, firstName, lastName },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      console.log(`user.controller, editUser. User not found with id: ${id}`);
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(
      `user.controller, editUser. Error while updating user with id: ${id}`,
      err
    );
    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`user.controller, editUser. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`user.controller, editUser. ${err.message}`);
      res.status(500).json({ message: "Server error while updating user" });
    }
  }
}

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  createUser,
  editUser,
};
