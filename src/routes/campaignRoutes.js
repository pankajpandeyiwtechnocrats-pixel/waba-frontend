import express from "express";
import {
  createCampaign,
  getCampaigns,
} from "../controllers/campaignController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:projectId", auth, createCampaign);
router.get("/:projectId", auth, getCampaigns);

export default router;
