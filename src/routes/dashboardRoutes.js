import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:projectId", auth, getDashboardStats);

export default router;
