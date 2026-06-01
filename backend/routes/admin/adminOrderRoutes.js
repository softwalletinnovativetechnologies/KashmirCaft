import express from "express";
import Order from "../../models/Order.js";
import { protect, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL ORDERS FOR ADMIN
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "name email")
      .populate("seller", "name email")
      .populate("product", "name price images")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log("ADMIN ORDER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
