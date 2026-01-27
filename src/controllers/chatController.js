import Chat from "../models/Chat.js";
import { io } from "../server.js";

/**
 * GET chats
 * GET /api/chats/:projectId?tab=requesting
 */
export const getChats = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { tab } = req.query;

    const filter = { project: projectId };

    if (tab) {
  filter.status = tab;
}

    const chats = await Chat.find(filter)
      .populate("contact")
      .populate("assignedTo", "name email")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (err) {
    console.error("GET CHATS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * SEND message (agent reply)
 * POST /api/chats/send
 */
export const sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;

    if (!chatId || !text) {
      return res.status(400).json({ message: "chatId and text are required" });
    }

    const chat = await Chat.findById(chatId).populate("contact");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({
      sender: "agent",
      text,
      time: new Date(),
    });

    chat.status = "intervened";

    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * ASSIGN agent
 * POST /api/chats/assign
 */
export const assignAgent = async (req, res) => {
  try {
    const { chatId, agentId } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.assignedTo = agentId;
    await chat.save();

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * CLOSE chat
 * POST /api/chats/close
 */
export const closeChat = async (req, res) => {
  try {
    const { chatId } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.status = "closed";
    await chat.save();

    res.json({ message: "Chat closed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * BLOCK chat
 * POST /api/chats/block
 */
export const blockChat = async (req, res) => {
  try {
    const { chatId } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.status = "blocked";
    await chat.save();

    res.json({ message: "Contact blocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/**
 * SIMULATE incoming WhatsApp message
 * POST /api/chats/incoming
 */
export const incomingMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;

    const chat = await Chat.findById(chatId).populate("contact");
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({
      sender: "contact",
      text,
      time: new Date(),
    });

    chat.status = "requesting";
    await chat.save();

    io.to(chatId).emit("new-message", {
      chatId,
      chat,
    });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
