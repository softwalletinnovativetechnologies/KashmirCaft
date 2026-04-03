import express from "express";
import { activateSeller } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/activate-seller", activateSeller);

export default router;
