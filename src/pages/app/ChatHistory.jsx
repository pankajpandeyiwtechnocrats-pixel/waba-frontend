import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChats } from "../../services/chatService";

import ChatList from "../../components/chat/ChatList";
import ChatWindow from "../../components/chat/ChatWindow";

export default function ChatHistory() {
  const { projectId } = useParams();

  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  /* ---------- LOAD CLOSED CHATS ---------- */
  const loadHistory = async () => {
    if (!projectId) return;

    const data = await getChats(projectId, "closed");
    setChats(data);
  };

  useEffect(() => {
    loadHistory();
  }, [projectId]);

  /* ---------- AUTO SELECT FIRST CHAT ---------- */
  useEffect(() => {
    if (!activeChat && chats.length > 0) {
      setActiveChat(chats[0]);
    }
  }, [chats]);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* LEFT: CHAT LIST */}
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelect={setActiveChat}
        hideTabs
      />

      {/* CENTER: FULL CHAT (READ-ONLY) */}
      <ChatWindow
        chat={activeChat}
        readOnly
      />
    </div>
  );
}
