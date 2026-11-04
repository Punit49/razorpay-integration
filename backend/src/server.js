import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config/config.js";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import User from "./models/User.js";
import { seedDatabase } from "./seed.js";
import paymentRouter from "./routes/paymentRoutes.js"

await connectDB();

// Ensure products and default user exist in DB
try {
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log("No products found in DB. Auto-seeding initial data...");
    await seedDatabase();
  }
} catch (err) {
  console.error("Warning: DB check/seeding encountered error:", err.message);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
  res.send("API Working");
});

// GET /api/products - Get all products from DB
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

// GET /api/user - Get default user from DB
app.get("/api/user", async (req, res) => {
  try {
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        name: "Punit Sahu",
        email: "punit.test@example.com",
        phone: "+91 9876543210",
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

app.use("/api/payments", paymentRouter);

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
