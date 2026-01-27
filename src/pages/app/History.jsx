import { useState } from "react";

const historyChats = [
  {
    id: 1,
    name: "Rahul Sharma",
    mobile: "+91 9876543210",
    status: "Resolved",
    date: "12 Jan 2026",
    messages: [
      { from: "user", text: "Hi, I need help", time: "10:21 AM" },
      { from: "agent", text: "Sure, how can I help?", time: "10:22 AM" },
      { from: "user", text: "Order issue", time: "10:23 AM" },
      { from: "agent", text: "Resolved your issue", time: "10:30 AM" },
    ],
  },
  {
    id: 2,
    name: "Anita Verma",
    mobile: "+91 9123456789",
    status: "Closed",
    date: "10 Jan 2026",
    messages: [
      { from: "user", text: "Payment failed", time: "4:10 PM" },
      { from: "agent", text: "Please retry now", time: "4:12 PM" },
    ],
  },
];

export default function History() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-full bg-white rounded-xl border overflow-hidden">
      {/* LEFT: History List */}
      <div className="w-72 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Chat History</h2>
        </div>

        {historyChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
              selectedChat?.id === chat.id
                ? "bg-green-50"
                : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="font-medium">{chat.name}</p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  chat.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {chat.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 truncate">
              {chat.messages.at(-1).text}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {chat.date}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT: Conversation */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="border-b p-4">
              <p className="font-semibold">
                {selectedChat.name}
              </p>
              <p className="text-sm text-gray-500">
                {selectedChat.mobile}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-md ${
                    msg.from === "agent"
                      ? "ml-auto text-right"
                      : ""
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg text-sm ${
                      msg.from === "agent"
                        ? "bg-green-600 text-white"
                        : "bg-white shadow"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {msg.time}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer (read-only notice) */}
            <div className="border-t p-3 text-center text-xs text-gray-400">
              This conversation is read-only
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation to view history
          </div>
        )}
      </div>
    </div>
  );
}
