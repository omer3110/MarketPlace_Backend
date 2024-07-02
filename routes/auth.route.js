const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserById,
  addProductToUser,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserById);
router.patch("/product/add/:id", addProductToUser);
module.exports = router;
