import { useState } from "react";
import { Plus } from "lucide-react";

export default function AutomationFlows() {
  const [flows, setFlows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [flowName, setFlowName] = useState("");
  const [trigger, setTrigger] = useState("Incoming Message");

  const createFlow = () => {
    if (!flowName) return;

    setFlows([
      ...flows,
      {
        id: Date.now(),
        name: flowName,
        trigger,
        status: "Draft",
        updatedAt: new Date().toLocaleDateString(),
      },
    ]);

    setFlowName("");
    setTrigger("Incoming Message");
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl border h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h1 className="text-lg font-semibold">
            Automation Flows
          </h1>
          <p className="text-sm text-gray-500">
            Automate replies, actions, and workflows
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
        >
          <Plus size={16} />
          Create New Flow
        </button>
      </div>

      {/* Content */}
      {flows.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <p className="mb-3">No automation flows created</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm"
          >
            Create your first flow
          </button>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-6 py-3">
                  Flow Name
                </th>
                <th className="text-left px-6 py-3">
                  Trigger
                </th>
                <th className="text-left px-6 py-3">
                  Status
                </th>
                <th className="text-left px-6 py-3">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {flows.map((flow) => (
                <tr
                  key={flow.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-3 font-medium">
                    {flow.name}
                  </td>
                  <td className="px-6 py-3">
                    {flow.trigger}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        flow.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : flow.status === "Paused"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {flow.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {flow.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Flow Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              Create Automation Flow
            </h2>

            <input
              placeholder="Flow Name"
              className="w-full border px-3 py-2 rounded-lg mb-3"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
            />

            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-6"
            >
              <option>Incoming Message</option>
              <option>Keyword</option>
              <option>Button Click</option>
              <option>Time Delay</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={createFlow}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
