const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

// allow CORS for local development (for production, you should configure it properly)
app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

//ROUTES
const productRoutes = require("./routes/product.route");
app.use("/api/product", productRoutes);

//START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
