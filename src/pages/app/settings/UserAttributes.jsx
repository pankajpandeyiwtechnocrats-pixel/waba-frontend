import { useState } from "react";
import { Plus } from "lucide-react";

export default function UserAttributes() {
  const [attributes, setAttributes] = useState([
    {
      id: 1,
      name: "City",
      type: "Text",
      required: false,
      createdAt: "10 Jan 2026",
    },
    {
      id: 2,
      name: "Customer Type",
      type: "Text",
      required: true,
      createdAt: "12 Jan 2026",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "Text",
    required: false,
  });

  const addAttribute = () => {
    if (!form.name) return;

    setAttributes([
      ...attributes,
      {
        id: Date.now(),
        ...form,
        createdAt: new Date().toLocaleDateString(),
      },
    ]);

    setForm({ name: "", type: "Text", required: false });
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl border h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h1 className="text-lg font-semibold">
            User Attributes
          </h1>
          <p className="text-sm text-gray-500">
            Define custom fields for your contacts
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
        >
          <Plus size={16} />
          Add Attribute
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-6 py-3">
                Attribute Name
              </th>
              <th className="text-left px-6 py-3">
                Type
              </th>
              <th className="text-left px-6 py-3">
                Required
              </th>
              <th className="text-left px-6 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((a) => (
              <tr
                key={a.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-3 font-medium">
                  {a.name}
                </td>
                <td className="px-6 py-3">
                  {a.type}
                </td>
                <td className="px-6 py-3">
                  {a.required ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                      Required
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                      Optional
                    </span>
                  )}
                </td>
                <td className="px-6 py-3">
                  {a.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Attribute Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              Add User Attribute
            </h2>

            <input
              placeholder="Attribute Name"
              className="w-full border px-3 py-2 rounded-lg mb-3"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg mb-3"
            >
              <option>Text</option>
              <option>Number</option>
              <option>Date</option>
              <option>Boolean</option>
            </select>

            <label className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                checked={form.required}
                onChange={() =>
                  setForm({
                    ...form,
                    required: !form.required,
                  })
                }
              />
              <span className="text-sm">
                Required field
              </span>
            </label>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addAttribute}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add Attribute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
