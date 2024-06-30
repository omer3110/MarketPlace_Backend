// seed.js
// This script seeds the database with sample data.
// This is for development purposes only and should not be used in production.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/product.model");

dotenv.config(); // Load environment variables

// Sample data
const products = [
  // Mixed products
  {
    id: "P10001",
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 150,
    category: "Electronics",
  },
  {
    id: "P20001",
    name: "Car Battery",
    price: 149.99,
    quantity: 60,
    category: "Automotive",
  },
  {
    id: "P30001",
    name: "Handgun",
    price: 499.99,
    quantity: 40,
    category: "Guns",
  },
  {
    id: "P40001",
    name: "Basketball",
    price: 29.99,
    quantity: 300,
    category: "Sports",
  },
  {
    id: "P50001",
    name: "T-Shirt",
    price: 14.99,
    quantity: 400,
    category: "Clothing",
  },
  {
    id: "P60001",
    name: "Running Shoes",
    price: 79.99,
    quantity: 150,
    category: "Shoes",
  },
  {
    id: "P70001",
    name: "Necklace",
    price: 199.99,
    quantity: 30,
    category: "Jewelry",
  },
  {
    id: "P10002",
    name: "Smartphone",
    price: 599.99,
    quantity: 75,
    category: "Electronics",
  },
  {
    id: "P20002",
    name: "Tire Inflator",
    price: 49.99,
    quantity: 200,
    category: "Automotive",
  },
  {
    id: "P30002",
    name: "Rifle",
    price: 799.99,
    quantity: 30,
    category: "Guns",
  },
  {
    id: "P40002",
    name: "Soccer Ball",
    price: 19.99,
    quantity: 250,
    category: "Sports",
  },
  {
    id: "P50002",
    name: "Jeans",
    price: 49.99,
    quantity: 150,
    category: "Clothing",
  },
  {
    id: "P60002",
    name: "Sandals",
    price: 19.99,
    quantity: 200,
    category: "Shoes",
  },
  {
    id: "P70002",
    name: "Ring",
    price: 299.99,
    quantity: 50,
    category: "Jewelry",
  },
  {
    id: "P10003",
    name: "Laptop",
    price: 899.99,
    quantity: 50,
    category: "Electronics",
  },
  {
    id: "P20003",
    name: "Car Vacuum",
    price: 89.99,
    quantity: 100,
    category: "Automotive",
  },
  {
    id: "P30003",
    name: "Shotgun",
    price: 699.99,
    quantity: 25,
    category: "Guns",
  },
  {
    id: "P40003",
    name: "Tennis Racket",
    price: 79.99,
    quantity: 100,
    category: "Sports",
  },
  {
    id: "P50003",
    name: "Jacket",
    price: 89.99,
    quantity: 80,
    category: "Clothing",
  },
  {
    id: "P60003",
    name: "Boots",
    price: 129.99,
    quantity: 50,
    category: "Shoes",
  },
  {
    id: "P70003",
    name: "Bracelet",
    price: 149.99,
    quantity: 70,
    category: "Jewelry",
  },
  {
    id: "P10004",
    name: "Smartwatch",
    price: 199.99,
    quantity: 120,
    category: "Electronics",
  },
  {
    id: "P20004",
    name: "Dash Cam",
    price: 99.99,
    quantity: 130,
    category: "Automotive",
  },
  {
    id: "P30004",
    name: "Ammunition",
    price: 59.99,
    quantity: 500,
    category: "Guns",
  },
  {
    id: "P40004",
    name: "Golf Clubs",
    price: 499.99,
    quantity: 20,
    category: "Sports",
  },
  {
    id: "P50004",
    name: "Sweater",
    price: 59.99,
    quantity: 120,
    category: "Clothing",
  },
  {
    id: "P60004",
    name: "Sneakers",
    price: 69.99,
    quantity: 100,
    category: "Shoes",
  },
  {
    id: "P70004",
    name: "Earrings",
    price: 89.99,
    quantity: 100,
    category: "Jewelry",
  },
  {
    id: "P10005",
    name: "Tablet",
    price: 329.99,
    quantity: 80,
    category: "Electronics",
  },
  {
    id: "P20005",
    name: "Car Cover",
    price: 79.99,
    quantity: 150,
    category: "Automotive",
  },
  {
    id: "P30005",
    name: "Gun Safe",
    price: 299.99,
    quantity: 15,
    category: "Guns",
  },
  {
    id: "P40005",
    name: "Baseball Glove",
    price: 39.99,
    quantity: 200,
    category: "Sports",
  },
  {
    id: "P50005",
    name: "Shorts",
    price: 29.99,
    quantity: 200,
    category: "Clothing",
  },
  {
    id: "P60005",
    name: "Slippers",
    price: 24.99,
    quantity: 180,
    category: "Shoes",
  },
  {
    id: "P70005",
    name: "Watch",
    price: 399.99,
    quantity: 20,
    category: "Jewelry",
  },
];

// Insert sample data into the database
async function seedDB() {
  await connectDB(); // Connect to the database
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDB();
