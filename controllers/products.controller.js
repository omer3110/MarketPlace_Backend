const fs = require("fs");
const Product = require("../models/product.model");

async function getProducts(req, res) {
  const name = req.query.name || "";
  const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : 0;
  const maxPrice = req.query.maxPrice
    ? parseFloat(req.query.maxPrice)
    : Infinity;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;

  const skip = (page - 1) * limit || 0;

  const query = {
    name: { $regex: name, $options: "i" },
    price: { $gte: minPrice, $lte: maxPrice },
  };

  try {
    const products = await Product.find(query).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      currentPage: page,
      totalPages: totalPages,
      totalProducts: total,
    });
  } catch (err) {
    console.log(
      "product.controller, getProducts. Error while getting products",
      err
    );
    res.status(500).json({ message: err.message });
  }
}

async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `product.controller, getProductById. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(
      `product.controller, getProductById. Error while getting Product with id: ${id}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      console.log(
        `product.controller, deleteProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.log(
      `product.controller, deleteProduct. Error while deleting Product with id: ${id}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}

async function createProduct(req, res) {
  const productToAdd = req.body;
  const newProduct = new Product(productToAdd);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product added", product: savedProduct });
  } catch (err) {
    console.log(
      "product.controller, createProduct. Error while creating product"
    );
    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`product.controller, createProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`product.controller, createProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

async function editProduct(req, res) {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity, category },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      console.log(
        `product.controller, updateProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product changed successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.log(
      `product.controller, updateProduct. Error while updating product with id: ${id}`,
      err
    );
    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`product.controller, updateProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`product.controller, updateProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while updating product" });
    }
  }
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
