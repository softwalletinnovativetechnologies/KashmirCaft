import express from "express";
import Product from "../../models/Product.js";
import { protect, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 GET ALL PRODUCTS FOR ADMIN
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// 🔥 APPROVE PRODUCT
router.put("/approve/:id", protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.status = "approved";

    await product.save();

    res.json({
      success: true,
      message: "Product approved successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// 🔥 REJECT PRODUCT
router.put("/reject/:id", protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.status = "rejected";

    await product.save();

    res.json({
      success: true,
      message: "Product rejected successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// 🔥 DELETE PRODUCT
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
