import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getCampaignAnalytics,
} from "../controllers/campaignAnalyticsController.js";

const router = express.Router();

router.get("/:campaignId", auth, getCampaignAnalytics);

export default router;
