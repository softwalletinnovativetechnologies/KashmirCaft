import express from "express";
import { getEarnings } from "../controllers/earningController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getEarnings);

export default router;
