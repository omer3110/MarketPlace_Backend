// seed.js
// This script seeds the database with sample data.
// This is for development purposes only and should not be used in production.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");

const Product = require("./models/product.model");
const User = require("./models/user.model");

const SALT_ROUNDS = 10; // Number of rounds to generate salt. 10 is recommended value

dotenv.config(); // Load environment variables

const products = [
  {
    name: "iPhone 12",
    quantity: 50,
    price: 799.99,
    categories: ["Electronics"],
  },
  {
    name: "Car Tire",
    quantity: 100,
    price: 59.99,
    categories: ["Automotive"],
  },
  {
    name: "Hunting Rifle",
    quantity: 20,
    price: 499.99,
    categories: ["Guns"],
  },
  {
    name: "Basketball",
    quantity: 150,
    price: 29.99,
    categories: ["Sports"],
  },
  {
    name: "Running Shoes",
    quantity: 60,
    price: 89.99,
    categories: ["Shoes"],
  },
  {
    name: "Diamond Ring",
    quantity: 5,
    price: 2999.99,
    categories: ["Jewelry"],
  },
  {
    name: "Smart TV",
    quantity: 30,
    price: 999.99,
    categories: ["Electronics"],
  },
  {
    name: "Car Battery",
    quantity: 40,
    price: 120.99,
    categories: ["Automotive"],
  },
  {
    name: "Handgun",
    quantity: 25,
    price: 399.99,
    categories: ["Guns"],
  },
  {
    name: "Soccer Ball",
    quantity: 200,
    price: 19.99,
    categories: ["Sports"],
  },
  {
    name: "Football Cleats",
    quantity: 80,
    price: 129.99,
    categories: ["Shoes"],
  },
  {
    name: "Gold Necklace",
    quantity: 10,
    price: 199.99,
    categories: ["Jewelry"],
  },
  {
    name: "Laptop",
    quantity: 40,
    price: 999.99,
    categories: ["Electronics"],
  },
  {
    name: "Oil Filter",
    quantity: 100,
    price: 9.99,
    categories: ["Automotive"],
  },
  {
    name: "Shotgun",
    quantity: 15,
    price: 599.99,
    categories: ["Guns"],
  },
  {
    name: "Tennis Racket",
    quantity: 50,
    price: 79.99,
    categories: ["Sports"],
  },
  {
    name: "Dress Shoes",
    quantity: 70,
    price: 199.99,
    categories: ["Shoes"],
  },
  {
    name: "Silver Bracelet",
    quantity: 20,
    price: 49.99,
    categories: ["Jewelry"],
  },
  {
    name: "Bluetooth Headphones",
    quantity: 90,
    price: 149.99,
    categories: ["Electronics"],
  },
  {
    name: "Windshield Wipers",
    quantity: 60,
    price: 14.99,
    categories: ["Automotive"],
  },
  {
    name: "Rifle Scope",
    quantity: 25,
    price: 199.99,
    categories: ["Guns"],
  },
  {
    name: "Baseball Bat",
    quantity: 110,
    price: 49.99,
    categories: ["Sports"],
  },
  {
    name: "Sandals",
    quantity: 120,
    price: 39.99,
    categories: ["Shoes"],
  },
  {
    name: "Pearl Earrings",
    quantity: 15,
    price: 129.99,
    categories: ["Jewelry"],
  },
  {
    name: "Tablet",
    quantity: 60,
    price: 499.99,
    categories: ["Electronics"],
  },
  {
    name: "Spark Plugs",
    quantity: 150,
    price: 19.99,
    categories: ["Automotive"],
  },
  {
    name: "Ammunition",
    quantity: 500,
    price: 24.99,
    categories: ["Guns"],
  },
  {
    name: "Golf Clubs",
    quantity: 20,
    price: 799.99,
    categories: ["Sports"],
  },
  {
    name: "Sneakers",
    quantity: 100,
    price: 59.99,
    categories: ["Shoes"],
  },
  {
    name: "Ruby Pendant",
    quantity: 8,
    price: 999.99,
    categories: ["Jewelry"],
  },
];

const users = [
  {
    username: "omer_mazig",
    password: "hashed_password1",
    firstName: "Omer",
    lastName: "Mazig",
  },
  {
    username: "baba_bubu",
    password: "hashed_password2",
    firstName: "Baba",
    lastName: "BuBu",
  },
  {
    username: "john_doe",
    password: "hashed_password3",
    firstName: "John",
    lastName: "Doe",
  },
];

async function seedDB() {
  try {
    await connectDB(); // Connect to the database
    await User.deleteMany({});
    await Product.deleteMany({});

    // const createdUsers = await User.insertMany(users);
    const createdUsers = await Promise.all(
      users.map(async (u) => {
        const hashedPassword = await bcrypt.hash(u.password, SALT_ROUNDS); // Hash password
        const user = new User({ ...u, password: hashedPassword }); // Create new user object
        await user.save(); // Save user to database
        return user; // Return the saved user object
      })
    );

    // Assign each product a user
    const productsWithUsers = products.map((product, index) => {
      return {
        ...product,
        user: createdUsers[index % createdUsers.length]._id,
      };
    });

    const createdProducts = await Product.insertMany(productsWithUsers);

    // Update users with the products they are selling
    for (let product of createdProducts) {
      await User.findByIdAndUpdate(
        product.user,
        { $push: { products: product._id } },
        { new: true, useFindAndModify: false }
      );
    }

    console.log("Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDB();
