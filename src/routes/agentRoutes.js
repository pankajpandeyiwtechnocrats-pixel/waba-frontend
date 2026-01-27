import express from "express";
import auth, { adminOnly } from "../middleware/authMiddleware.js";
import {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from "../controllers/agentController.js";

const router = express.Router();

router.post("/", auth, adminOnly, createAgent);
router.get("/", auth, adminOnly, getAgents);
router.get("/:id", auth, adminOnly, getAgentById);
router.put("/:id", auth, adminOnly, updateAgent);
router.delete("/:id", auth, adminOnly, deleteAgent);

export default router;
