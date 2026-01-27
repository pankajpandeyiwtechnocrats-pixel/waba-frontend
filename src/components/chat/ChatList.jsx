export default function ChatList({
  chats,
  tab,
  setTab,
  activeChat,
  onSelect,
  hideTabs = false,
}) {
  return (
    <div className="w-72 bg-white border-r flex flex-col">
      {!hideTabs && (
        <div className="flex border-b">
          <button
            onClick={() => setTab("requesting")}
            className={`flex-1 p-2 ${
              tab === "requesting" ? "bg-green-100" : ""
            }`}
          >
            Requesting
          </button>
          <button
            onClick={() => setTab("intervened")}
            className={`flex-1 p-2 ${
              tab === "intervened" ? "bg-green-100" : ""
            }`}
          >
            Intervened
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onSelect(chat)}
            className={`p-3 border-b cursor-pointer ${
              activeChat?._id === chat._id
                ? "bg-green-50"
                : ""
            }`}
          >
            <div className="font-medium">
              {chat.contact?.name || chat.contact?.phone}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {chat.messages?.[chat.messages.length - 1]?.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
