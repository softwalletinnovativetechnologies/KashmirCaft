import express from "express";
import { register, login } from "../controllers/authController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// 🔐 REGISTER
router.post(
  "/register",

  upload.fields([
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
    { name: "panCardImage", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),

  register,
);

// 🔐 LOGIN
router.post("/login", login);

export default router;
