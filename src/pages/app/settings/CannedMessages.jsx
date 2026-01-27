import { useState } from "react";
import { Plus } from "lucide-react";

export default function CannedMessages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: "Welcome Message",
      shortcut: "/welcome",
      category: "General",
      content:
        "Hi 👋 Welcome! How can we help you today?",
      enabled: true,
      createdAt: "10 Jan 2026",
    },
    {
      id: 2,
      title: "Order Delay",
      shortcut: "/delay",
      category: "Support",
      content:
        "Sorry for the delay. Your order is being processed and we will update you soon.",
      enabled: true,
      createdAt: "12 Jan 2026",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    shortcut: "",
    category: "General",
    content: "",
    enabled: true,
  });

  const addMessage = () => {
    if (!form.title || !form.content) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        ...form,
        createdAt: new Date().toLocaleDateString(),
      },
    ]);

    setForm({
      title: "",
      shortcut: "",
      category: "General",
      content: "",
      enabled: true,
    });
    setShowModal(false);
  };

  const toggleEnabled = (id) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, enabled: !m.enabled }
          : m
      )
    );
  };

  return (
    <div className="bg-white rounded-xl border h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h1 className="text-lg font-semibold">
            Canned Messages
          </h1>
          <p className="text-sm text-gray-500">
            Predefined replies for faster agent responses
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
        >
          <Plus size={16} />
          Add Message
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-6 py-3">
                Title
              </th>
              <th className="text-left px-6 py-3">
                Shortcut
              </th>
              <th className="text-left px-6 py-3">
                Category
              </th>
              <th className="text-left px-6 py-3">
                Status
              </th>
              <th className="text-left px-6 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr
                key={m.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-3 font-medium">
                  {m.title}
                </td>
                <td className="px-6 py-3 text-green-600">
                  {m.shortcut}
                </td>
                <td className="px-6 py-3">
                  {m.category}
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => toggleEnabled(m.id)}
                    className={`px-2 py-1 text-xs rounded-full ${
                      m.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {m.enabled ? "Enabled" : "Disabled"}
                  </button>
                </td>
                <td className="px-6 py-3">
                  {m.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Message Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              Add Canned Message
            </h2>

            <input
              placeholder="Title"
              className="w-full border px-3 py-2 rounded-lg mb-3"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <input
              placeholder="Shortcut (e.g. /welcome)"
              className="w-full border px-3 py-2 rounded-lg mb-3"
              value={form.shortcut}
              onChange={(e) =>
                setForm({
                  ...form,
                  shortcut: e.target.value,
                })
              }
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded-lg mb-3"
            >
              <option>General</option>
              <option>Sales</option>
              <option>Support</option>
            </select>

            <textarea
              placeholder="Message content"
              rows={4}
              className="w-full border rounded-lg p-3 mb-4"
              value={form.content}
              onChange={(e) =>
                setForm({
                  ...form,
                  content: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addMessage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
