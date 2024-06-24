const fs = require("fs");
const PRODUCTS = require("../data/products.json");

function makeid(length = 5) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function getProducts(req, res) {
  res.status(200).json(PRODUCTS);
}

function getProductById(req, res) {
  const { id } = req.params;

  const product = PRODUCTS.find((p) => {
    return p.id === id;
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
}

function deleteProduct(req, res) {
  const { id } = req.params;
  const products = [...PRODUCTS];
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);

  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(200).json({ message: "Product deleted" });
}

function createProduct(req, res) {
  const { name, price, category } = req.body;
  const id = makeid();
  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ message: "Please insert product name price and category" });
  }

  const products = [...PRODUCTS];
  const existingProduct = products.find((product) => product.id === id);

  if (existingProduct) {
    return res
      .status(400)
      .json({ message: "Product with this ID already exists" });
  }

  const newProduct = { id, name, price, category };
  products.push(newProduct);

  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(201).json({ message: "Product added", product: newProduct });
}

function editProduct(req, res) {
  const { id } = req.params;
  const { name, price, category } = req.body;
  const products = [...PRODUCTS];
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[productIndex] = {
    id,
    name: name || products[productIndex].name,
    price: price || products[productIndex].price,
    category: category || products[productIndex].category,
  };
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(200).json({
    message: "Product changed successfully",
    product: products[productIndex],
  });
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
