export default function MessageBubble({ message }) {
  const isAgent = message.sender === "agent";

  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
          isAgent
            ? "bg-green-600 text-white"
            : "bg-white border"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
