import { useState } from "react";
import { Plus } from "lucide-react";

const tagColors = [
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-pink-500",
];

export default function TagsSetting() {
  const [tags, setTags] = useState([
    {
      id: 1,
      name: "VIP",
      color: "bg-green-500",
      createdAt: "10 Jan 2026",
    },
    {
      id: 2,
      name: "Pending Payment",
      color: "bg-yellow-500",
      createdAt: "12 Jan 2026",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState(tagColors[0]);

  const addTag = () => {
    if (!tagName) return;

    setTags([
      ...tags,
      {
        id: Date.now(),
        name: tagName,
        color: tagColor,
        createdAt: new Date().toLocaleDateString(),
      },
    ]);

    setTagName("");
    setTagColor(tagColors[0]);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl border h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h1 className="text-lg font-semibold">Tags</h1>
          <p className="text-sm text-gray-500">
            Create and manage tags to organize chats and contacts
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
        >
          <Plus size={16} />
          Add Tag
        </button>
      </div>

      {/* Tags List */}
      <div className="p-6 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm"
          >
            <span
              className={`w-3 h-3 rounded-full ${tag.color}`}
            />
            <span className="font-medium">{tag.name}</span>
          </div>
        ))}

        {tags.length === 0 && (
          <p className="text-gray-400">
            No tags created yet
          </p>
        )}
      </div>

      {/* Add Tag Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              Add Tag
            </h2>

            <input
              placeholder="Tag name"
              className="w-full border px-3 py-2 rounded-lg mb-4"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">
                Select color
              </p>
              <div className="flex gap-2">
                {tagColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setTagColor(color)}
                    className={`w-6 h-6 rounded-full ${color} ${
                      tagColor === color
                        ? "ring-2 ring-black"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addTag}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add Tag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
