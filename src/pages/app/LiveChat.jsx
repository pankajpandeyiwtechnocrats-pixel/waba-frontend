import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getChats,
  sendMessage,
  closeChat,
} from "../../services/chatService";
import socket from "../../services/socket";

import ChatList from "../../components/chat/ChatList";
import ChatWindow from "../../components/chat/ChatWindow";
import ContactProfileSidebar from "../../components/chat/ContactProfileSidebar";

export default function LiveChat() {
  const { projectId } = useParams();

  const [tab, setTab] = useState("requesting");
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  /* ---------- LOAD CHATS ---------- */
  const loadChats = async () => {
    if (!projectId) return;
    try {
      const data = await getChats(projectId, tab);
      setChats(data);
    } catch (err) {
      console.error("Failed to load chats", err);
    }
  };

  useEffect(() => {
    loadChats();
  }, [projectId, tab]);

  /* ---------- AUTO SELECT FIRST CHAT ---------- */
  useEffect(() => {
    if (!activeChat && chats.length > 0) {
      setActiveChat(chats[0]);
    }
  }, [chats]);

  /* ---------- SOCKET CONNECT ---------- */
  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);

  /* ---------- JOIN CHAT ROOM ---------- */
  useEffect(() => {
    if (!activeChat) return;

    socket.emit("join-chat", activeChat._id);

    const handleNewMessage = ({ chatId, chat }) => {
      if (chatId === activeChat._id) {
        setActiveChat(chat);
      }
      loadChats();
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [activeChat]);

  /* ---------- SEND MESSAGE ---------- */
  const handleSend = async (text) => {
    if (!activeChat || !text) return;

    try {
      const updatedChat = await sendMessage(activeChat._id, text);
      setActiveChat(updatedChat);
      loadChats();
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  /* ---------- CLOSE CHAT ---------- */
  const handleCloseChat = async () => {
    if (!activeChat) return;

    try {
      await closeChat(activeChat._id);
      setActiveChat(null);
      loadChats();
    } catch (err) {
      console.error("Close chat failed", err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* LEFT: CHAT LIST */}
      <ChatList
        chats={chats}
        tab={tab}
        setTab={setTab}
        activeChat={activeChat}
        onSelect={setActiveChat}
      />

      {/* CENTER: CHAT WINDOW */}
      <ChatWindow
        chat={activeChat}
        onSend={handleSend}
        onClose={handleCloseChat}
      />

      {/* RIGHT: CONTACT PROFILE */}
      {activeChat && (
        <ContactProfileSidebar contact={activeChat.contact} />
      )}
    </div>
  );
}
