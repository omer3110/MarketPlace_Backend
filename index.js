const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3000;
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

  const userRoutes = require("./routes/user.route");
  app.use("/api/user", userRoutes);

  //START SERVER
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
