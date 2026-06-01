import express from "express";
import User from "../../models/User.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// GET DETAILS
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(user.sellerDetails || {});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE DETAILS
router.put("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.sellerDetails = {
      accountHolderName: req.body.accountHolderName,

      bankName: req.body.bankName,

      accountNumber: req.body.accountNumber,

      ifscCode: req.body.ifscCode,

      upiId: req.body.upiId,

      panNumber: req.body.panNumber,
    };

    await user.save();

    res.json({
      message: "Saved",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
