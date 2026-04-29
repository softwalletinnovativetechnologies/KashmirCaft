import express from "express";
import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

const router = express.Router();

// GET ALL VENDORS WITH DATA
router.get("/", async (req, res) => {
  try {
    const vendors = await User.find({ role: "seller" });

    const result = await Promise.all(
      vendors.map(async (vendor) => {
        const products = await Product.countDocuments({ sellerId: vendor._id });
        const orders = await Order.find({ "items.sellerId": vendor._id });

        const revenue = orders.reduce((acc, o) => acc + o.total, 0);

        return {
          ...vendor._doc,
          totalProducts: products,
          totalRevenue: revenue,
        };
      }),
    );

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// APPROVE
router.put("/approve/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "Approved" });
});

// BLOCK
router.put("/block/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "blocked" });
  res.json({ message: "Blocked" });
});

export default router;
