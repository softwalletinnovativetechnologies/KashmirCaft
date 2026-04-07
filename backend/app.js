import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import earningRoutes from "./routes/earningRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";

import path from "path";

const app = express();
  
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/earnings", earningRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
