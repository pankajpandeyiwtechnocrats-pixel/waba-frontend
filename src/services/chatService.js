import api from "./api";

/**
 * Get chats by project & tab
 * tab = requesting | intervened | closed
 */
export const getChats = async (projectId, tab) => {
  const res = await api.get(`/chats/${projectId}?tab=${tab}`);
  return res.data;
};

/**
 * Send message
 */
export const sendMessage = async (chatId, text) => {
  const res = await api.post("/chats/send", {
    chatId,
    text,
  });
  return res.data;
};

/** * Close chat
 * Close chat by chatId
 */
export const closeChat = async (chatId) => {
  const res = await api.post("/chats/close", { chatId });
  return res.data;
};