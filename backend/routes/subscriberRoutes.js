import express from "express";

import {
  subscribe,
  getSubscribers,
} from "../controllers/subscriberController.js";

import {
  protect,
  isAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", subscribe);

router.get(
  "/admin",
  protect,
  isAdmin,
  getSubscribers
);

export default router;