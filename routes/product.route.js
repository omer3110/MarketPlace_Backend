const express = require("express");

const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
} = require("../controllers/products.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.post("/create", createProduct);
router.patch("/edit/:id", editProduct);

module.exports = router;
