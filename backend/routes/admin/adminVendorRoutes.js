import express from "express";
import User from "../../models/User.js";
import { protect, isAdmin } from "../../middleware/authMiddleware.js";
import sendMail from "../../utils/sendMail.js";

const router = express.Router();

// ================= GET ALL VENDORS =================

router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const vendors = await User.find({
      role: "seller",
    }).sort({ createdAt: -1 });

    res.json(vendors);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= APPROVE =================

router.put("/approve/:id", protect, isAdmin, async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    vendor.status = "approved";

    vendor.statusUpdatedAt = new Date();

    vendor.statusUpdatedBy = req.user._id;

    await vendor.save();

    // 📧 MAIL
    await sendMail(
      vendor.email,
      "KashmirCraft Seller Approval",
      `
        <div style="font-family:sans-serif;padding:20px">
          <h2>Hello ${vendor.name} 🎉</h2>

          <p>
            Your seller account has been
            <b>APPROVED</b>
            by KashmirCraft Admin.
          </p>

          <p>
            You can now login and start selling.
          </p>

          <br/>

          <a href="http://localhost:5173/auth">
            Login Now
          </a>
        </div>
      `,
    );

    res.json({
      message: "Vendor approved successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= REJECT =================

router.put("/reject/:id", protect, isAdmin, async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    vendor.status = "rejected";

    vendor.statusUpdatedAt = new Date();

    vendor.statusUpdatedBy = req.user._id;

    await vendor.save();

    await sendMail(
      vendor.email,
      "KashmirCraft Seller Rejected",
      `
        <div style="font-family:sans-serif;padding:20px">
          <h2>Hello ${vendor.name}</h2>

          <p>
            Your seller registration has been
            <b>REJECTED</b>.
          </p>

          <p>
            Please upload valid documents and try again.
          </p>
        </div>
      `,
    );

    res.json({
      message: "Vendor rejected successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= BLOCK =================

router.put("/block/:id", protect, isAdmin, async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    vendor.status = "blocked";

    vendor.statusUpdatedAt = new Date();

    vendor.statusUpdatedBy = req.user._id;

    await vendor.save();

    await sendMail(
      vendor.email,
      "KashmirCraft Seller Blocked",
      `
        <div style="font-family:sans-serif;padding:20px">
          <h2>Hello ${vendor.name}</h2>

          <p>
            Your seller account has been
            <b>BLOCKED</b>
            by KashmirCraft Admin.
          </p>

          <p>
            Please contact support.
          </p>
        </div>
      `,
    );

    res.json({
      message: "Vendor blocked successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
