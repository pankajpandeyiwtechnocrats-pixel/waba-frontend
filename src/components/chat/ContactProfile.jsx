export default function ContactProfile({ chat, onBlock }) {
  if (!chat) return null;

  const { contact, intervenedBy, status } = chat;

  return (
    <div className="w-72 border-l bg-white p-4">
      <div className="text-center">
        <img
          src="https://ui-avatars.com/api/?name=User"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <h3 className="mt-2 font-semibold">{contact?.name}</h3>
        <p className="text-sm text-gray-500">{contact?.phone}</p>
      </div>

      <div className="mt-6 text-sm space-y-2">
        <p>
          <span className="text-gray-500">Status:</span>{" "}
          <span className="font-medium capitalize">{status}</span>
        </p>

        {intervenedBy && (
          <p>
            <span className="text-gray-500">Intervened by:</span>{" "}
            {intervenedBy?.name}
          </p>
        )}

        <p>
          <span className="text-gray-500">Last Active:</span>{" "}
          {new Date(chat.updatedAt).toLocaleString()}
        </p>
      </div>

      <button
        onClick={onBlock}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded"
      >
        Block Contact
      </button>
    </div>
  );
}
