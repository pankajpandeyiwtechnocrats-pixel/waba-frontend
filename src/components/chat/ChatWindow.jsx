import { useState } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ chat, onSend, onClose, readOnly = false }) {
  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a chat
      </div>
    );
  }

  const isClosed = chat.status === "closed";

  return (
    <div className="flex-1 flex flex-col bg-white border-x">
      {/* HEADER */}
      <div className="p-3 border-b flex justify-between items-center">
        <div>
          <div className="font-semibold">
            {chat.contact?.name || "Unknown"}
          </div>
          <div className="text-xs text-gray-500">
            {chat.contact?.phone}
          </div>
        </div>

        {!readOnly && !isClosed && (
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
          >
            Close Chat
          </button>
        )}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chat.messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs p-2 rounded ${
              msg.sender === "agent"
                ? "ml-auto bg-green-100"
                : "bg-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* INPUT (DISABLED IN HISTORY) */}
      {!readOnly && !isClosed && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const text = e.target.message.value;
            onSend(text);
            e.target.reset();
          }}
          className="p-3 border-t flex gap-2"
        >
          <input
            name="message"
            placeholder="Type message..."
            className="flex-1 border rounded px-3 py-2"
          />
          <button className="bg-green-600 text-white px-4 rounded">
            Send
          </button>
        </form>
      )}
    </div>
  );
}
