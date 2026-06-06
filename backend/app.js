import express from "express";
import cors from "cors";
import path from "path";


import authRoutes from "./routes/authRoutes.js";

import userAddressRoutes from "./routes/user/addressRoutes.js";
import userProfileRoutes from "./routes/user/profileRoutes.js";
import userOrderRoutes from "./routes/user/orderRoutes.js";

// 🔥 PUBLIC PRODUCTS
import productRoutes from "./routes/productRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";

// ================= SELLER =================
import sellerProductRoutes from "./routes/seller/productRoutes.js";
import sellerDashboardRoutes from "./routes/seller/dashboardRoutes.js";
import sellerOrderRoutes from "./routes/seller/orderRoutes.js";
import earningRoutes from "./routes/seller/earningRoutes.js";
import paymentRoutes from "./routes/seller/paymentRoutes.js";
import sellerProfileRoutes from "./routes/seller/profileRoutes.js";

// ================= ADMIN =================
import adminDashboardRoutes from "./routes/admin/adminDashboardRoutes.js";
import adminProductRoutes from "./routes/admin/adminProductRoutes.js";
import adminOrderRoutes from "./routes/admin/adminOrderRoutes.js";
import adminVendorRoutes from "./routes/admin/adminVendorRoutes.js";

// 🔐 MIDDLEWARE
import { protect, isAdmin } from "./middleware/authMiddleware.js";

const app = express();

// 🔥 IMPORTANT
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// 🔥 STATIC UPLOADS
app.use("/uploads", express.static("uploads"));
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// ================= AUTH =================
app.use("/api/auth", authRoutes);

// ================= USER =================
app.use("/api/user/addresses", userAddressRoutes);

app.use("/api/user/profile", userProfileRoutes);

app.use("/api/user/orders", userOrderRoutes);

// ================= PUBLIC PRODUCTS =================
app.use("/api/products", productRoutes);
app.use(
  "/api/subscribers",
  subscriberRoutes
);

// ================= SELLER =================
app.use("/api/seller/products", protect, sellerProductRoutes);

app.use("/api/seller/orders", protect, sellerOrderRoutes);

app.use("/api/seller/dashboard", protect, sellerDashboardRoutes);

app.use("/api/seller/earnings", protect, earningRoutes);

app.use("/api/seller/payments", protect, paymentRoutes);

app.use("/api/seller/profile", protect, sellerProfileRoutes);

// ================= ADMIN =================
app.use("/api/admin/dashboard", protect, isAdmin, adminDashboardRoutes);

app.use("/api/admin/products", protect, isAdmin, adminProductRoutes);

app.use("/api/admin/orders", protect, isAdmin, adminOrderRoutes);

app.use("/api/admin/vendors", protect, isAdmin, adminVendorRoutes);

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("API running...");
});

// 🔥 GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: err.message || "Server Error",
  });
});

export default app;
