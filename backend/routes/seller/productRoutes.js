import express from "express";
import {
  addProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from "../../controllers/seller/productController.js";
import { protect } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// ➕ ADD PRODUCT (with image)
router.post("/", protect, upload.single("image"), addProduct);

// 📦 GET PRODUCTS
router.get("/", protect, getMyProducts);

// ✏️ UPDATE PRODUCT (with image)
router.put("/:id", protect, upload.single("image"), updateProduct);

// ❌ DELETE
router.delete("/:id", protect, deleteProduct);

export default router;
