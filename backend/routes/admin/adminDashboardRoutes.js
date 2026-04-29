import express from "express";
import { getAdminStats } from "../../controllers/admin/adminDashboardController.js";

const router = express.Router();

router.get("/", getAdminStats);

export default router;
