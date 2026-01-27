import express from "express";
import {
  getChats,
  sendMessage,
  assignAgent,
  closeChat,
  blockChat,
  incomingMessage,
} from "../controllers/chatController.js";

const router = express.Router();

/**
 * GET chats (requesting / intervened)
 * GET /api/chats/:projectId?tab=requesting
 */
router.get("/:projectId", getChats);

/**
 * SEND message
 * POST /api/chats/send
 */
router.post("/send", sendMessage);

/**
 * ASSIGN agent
 * POST /api/chats/assign
 */
router.post("/assign", assignAgent);

/**
 * CLOSE chat
 * POST /api/chats/close
 */
router.post("/close", closeChat);

/**
 * BLOCK chat / contact
 * POST /api/chats/block
 */
router.post("/block", blockChat);

router.post("/incoming", incomingMessage);

export default router;
