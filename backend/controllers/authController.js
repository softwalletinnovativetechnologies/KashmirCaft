import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 REGISTER
export const register = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    // 🔥 FORCE SAFE ROLE (no admin allowed from frontend)
    if (role !== "seller") {
      role = "buyer"; // default
    }

    // ❌ BLOCK ADMIN COMPLETELY
    if (role === "admin") {
      return res.status(403).json({
        message: "Admin registration not allowed",
      });
    }

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be 6+ characters",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    await User.create({
      name,
      email,
      password: hashedPassword,
      role, // ✅ only buyer or seller possible
      isPaid: true,
      status: "approved",
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔐 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
