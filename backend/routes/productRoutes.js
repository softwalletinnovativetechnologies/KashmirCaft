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
      "name",
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
