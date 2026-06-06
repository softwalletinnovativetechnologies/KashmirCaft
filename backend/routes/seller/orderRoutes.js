import express from "express";
import {
  createOrder,
  updateOrderStatus,
} from "../../controllers/seller/orderController.js";

import Order from "../../models/Order.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 CREATE ORDER
router.post("/", protect, createOrder);

// 🔥 GET ONLY LOGGED-IN SELLER'S ORDERS
router.get("/", protect, async (req, res) => {
  try {
    console.log("REQ USER:", req.user);
    const orders = await Order.find({
      seller: req.user.id, // only current seller
    })
      .populate("buyer", "name email")
      .populate("product", "name price images")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log("SELLER ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch seller orders",
    });
  }
});

// 🔥 UPDATE ORDER STATUS
router.put("/:id/status", protect, updateOrderStatus);

export default router;
