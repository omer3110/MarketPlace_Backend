const express = require("express");

const {
  getUsers,
  getUserById,
  deleteUser,
  createUser,
  editUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.post("/create", createUser);
router.patch("/edit/:id", editUser);

module.exports = router;
