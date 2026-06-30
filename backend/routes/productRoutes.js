import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 🌍 PUBLIC PRODUCTS (SHOP PAGE)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔍 SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ⭐ POST REVIEW
router.post("/:id/review", async (req, res) => {
  try {
    const { user, comment, rating } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.reviews.push({
      user,
      comment,
      rating,
    });

    await product.save();

    res.json({
      message: "Review added",
      reviews: product.reviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;