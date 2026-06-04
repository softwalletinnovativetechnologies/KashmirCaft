import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 REGISTER
export const register = async (req, res) => {
  try {
    let {
  name,
  email,
  password,
  role,

  phone,
  shopName,
  aadhaarNumber,
  panNumber,
  gstNumber,

  sellerDetails,
} = req.body;

let parsedSellerDetails = {};

if (sellerDetails) {
  try {
    parsedSellerDetails = JSON.parse(sellerDetails);
  } catch (err) {
    console.log("Seller Details Parse Error:", err);
  }
}

    // 🔥 SAFE ROLE
    if (role !== "seller") {
      role = "buyer";
    }

    // ❌ BLOCK ADMIN REGISTER
    if (role === "admin") {
      return res.status(403).json({
        message: "Admin registration not allowed",
      });
    }

    // 🔥 BASIC VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be 6+ characters",
      });
    }

    // 🔥 EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 🔥 SELLER VALIDATION
    if (role === "seller") {
      if (!phone || !shopName || !aadhaarNumber || !panNumber) {
        return res.status(400).json({
          message: "Seller details required",
        });
      }

      // Aadhaar validation
      if (!/^\d{12}$/.test(aadhaarNumber)) {
        return res.status(400).json({
          message: "Invalid Aadhaar Number",
        });
      }

      // PAN validation
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
        return res.status(400).json({
          message: "Invalid PAN Number",
        });
      }

      // 🔥 FILE VALIDATION
      if (
        !req.files?.aadhaarFront ||
        !req.files?.aadhaarBack ||
        !req.files?.panCardImage
      ) {
        return res.status(400).json({
          message: "Upload all required documents",
        });
      }
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 CREATE USER
    const user = await User.create({
  name,
  email,
  password: hashedPassword,

  role,

  phone,
  shopName,
  aadhaarNumber,
  panNumber,
  gstNumber,

  sellerDetails: {
    accountHolderName:
      parsedSellerDetails.accountHolderName || "",

    bankName:
      parsedSellerDetails.bankName || "",

    accountNumber:
      parsedSellerDetails.accountNumber || "",

    ifscCode:
      parsedSellerDetails.ifscCode || "",

    upiId:
      parsedSellerDetails.upiId || "",

    panNumber:
      parsedSellerDetails.panNumber || "",
  },

  aadhaarFront:
    req.files?.aadhaarFront?.[0]?.filename || "",

  aadhaarBack:
    req.files?.aadhaarBack?.[0]?.filename || "",

  panCardImage:
    req.files?.panCardImage?.[0]?.filename || "",

  profileImage:
    req.files?.profileImage?.[0]?.filename || "",

  isVerified: role === "seller" ? false : true,

  status: role === "seller"
    ? "pending"
    : "approved",
});

    res.status(201).json({
      message:
        role === "seller"
          ? "Seller verification submitted"
          : "User registered successfully",

      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// 🔐 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 🔥 SELLER VERIFICATION CHECK
    if (user.role === "seller") {
      if (user.status == "pending") {
        return res.status(403).json({
          message: "Seller verification pending approval",
        });
      }

      if (user.status === "rejected") {
        return res.status(403).json({
          message: "Seller verification rejected",
        });
      }

      if (user.status === "blocked") {
        return res.status(403).json({
          message: "Your seller account is blocked",
        });
      }
    }

    // 🔐 TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
