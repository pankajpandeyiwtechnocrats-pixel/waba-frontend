import express from "express";
import {
  createTemplate,
  getTemplates,
} from "../controllers/templateController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:projectId", auth, createTemplate);
router.get("/:projectId", auth, getTemplates);

export default router;
