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

// MARK SELLER PAYMENT COMPLETED
router.put("/:id/pay-seller", protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.sellerPaid = true;
    order.sellerPaidAt = new Date();

    await order.save();

    res.json({
      success: true,
      message: "Seller marked as paid",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
