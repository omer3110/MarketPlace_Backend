const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

async function main() {
  // Connect to database
  await connectDB();

  // MIDDLEWARES
  // parse json body in request (for POST, PUT, PATCH requests)
  app.use(express.json());

  // allow CORS for local development (for production, you should configure it properly)
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  //ROUTES
  const productRoutes = require("./routes/product.route");
  app.use("/api/product", productRoutes);

  const authRoutes = require("./routes/auth.route");
  app.use("/api/auth", authRoutes);

  //START SERVER
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
