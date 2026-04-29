import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

// seller routes
import sellerProductRoutes from "./routes/seller/productRoutes.js";
import sellerDashboardRoutes from "./routes/seller/dashboardRoutes.js";
import sellerOrderRoutes from "./routes/seller/orderRoutes.js";
import earningRoutes from "./routes/seller/earningRoutes.js";
import paymentRoutes from "./routes/seller/paymentRoutes.js";

// admin routes
import adminDashboardRoutes from "./routes/admin/adminDashboardRoutes.js";
import adminProductRoutes from "./routes/admin/adminProductRoutes.js";
//import adminOrderRoutes from "./routes/admin/adminOrderRoutes.js";
import adminVendorRoutes from "./routes/admin/adminVendorRoutes.js";

// 🔐 middleware
import { protect, isAdmin } from "./middleware/authMiddleware.js";

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

// ================= AUTH =================
app.use("/api/auth", authRoutes);

// ================= SELLER =================
app.use("/api/seller/products", protect, sellerProductRoutes);
app.use("/api/seller/orders", protect, sellerOrderRoutes);
app.use("/api/seller/dashboard", protect, sellerDashboardRoutes);
app.use("/api/seller/earnings", protect, earningRoutes);
app.use("/api/seller/payments", protect, paymentRoutes);

// ================= ADMIN =================
app.use("/api/admin/dashboard", protect, isAdmin, adminDashboardRoutes);
app.use("/api/admin/products", protect, isAdmin, adminProductRoutes);
//app.use("/api/admin/orders", protect, isAdmin, adminOrderRoutes);
app.use("/api/admin/vendors", protect, isAdmin, adminVendorRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
