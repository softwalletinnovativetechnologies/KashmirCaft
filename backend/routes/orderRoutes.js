import express from "express";
import {
  createOrder,
  getSellerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getSellerOrders);
router.put("/:id", protect, updateOrderStatus);

export default router;
