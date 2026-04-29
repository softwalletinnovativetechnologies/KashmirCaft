import express from "express";
import Product from "../../models/Product.js";

const router = express.Router();

// All products (admin view)
router.get("/", async (req, res) => {
  const products = await Product.find().populate("sellerId");
  res.json(products);
});

// Approve product
router.put("/approve/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "Approved" });
});

// Delete product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
