import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
const app = express();

// 🔹 Middleware
app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON data

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔹 Example Route (future use)
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend working successfully 🚀",
  });
});

export default app;
