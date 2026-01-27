import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { createAgent, getAgents } from "../../services/agentService";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "agent",
  });

  /* ---------- LOAD AGENTS ---------- */
  const loadAgents = async () => {
    try {
      const data = await getAgents();
      setAgents(data);
    } catch (err) {
      console.error("Failed to load agents", err);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  /* ---------- CREATE AGENT ---------- */
  const handleCreateAgent = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Name, Email and Password are required");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await createAgent(form);
      setForm({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "agent",
      });
      setShowModal(false);
      loadAgents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create agent");
    }
  };

  return (
    <div className="bg-white rounded-xl border h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h1 className="text-lg font-semibold">Agents</h1>
          <p className="text-sm text-gray-500">
            Manage team members and access
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
        >
          <Plus size={16} />
          Add Agent
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Mobile</th>
              <th className="text-left px-6 py-3">Role</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{a.name}</td>
                <td className="px-6 py-3">{a.email}</td>
                <td className="px-6 py-3">{a.mobile || "-"}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      a.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {a.role}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Active
                  </span>
                </td>
                <td className="px-6 py-3">
                  {new Date(a.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {agents.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-400"
                >
                  No agents created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Agent Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              Add Agent
            </h2>

            <input
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded-lg mb-3"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full border px-3 py-2 rounded-lg mb-3"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Mobile"
              className="w-full border px-3 py-2 rounded-lg mb-3"
              value={form.mobile}
              onChange={(e) =>
                setForm({ ...form, mobile: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border px-3 py-2 rounded-lg mb-3"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg mb-6"
            >
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAgent}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
