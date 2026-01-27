import { useState } from "react";

export default function AgentSettings() {
  const [autoOffline, setAutoOffline] = useState(true);
  const [maxChats, setMaxChats] = useState(5);
  const [allowTransfer, setAllowTransfer] = useState(true);
  const [allowClose, setAllowClose] = useState(true);

  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "18:00",
  });

  const saveSettings = () => {
    alert("Agent settings saved (backend later)");
  };

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">
          Agent Settings
        </h1>
        <p className="text-sm text-gray-500">
          Configure agent workload, permissions, and
          availability
        </p>
      </div>

      <div className="p-6 max-w-3xl space-y-8">
        {/* Auto Offline */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Auto-set Agent Offline
            </p>
            <p className="text-sm text-gray-500">
              Automatically mark agent offline after inactivity
            </p>
          </div>

          <button
            onClick={() => setAutoOffline(!autoOffline)}
            className={`w-12 h-6 rounded-full relative transition ${
              autoOffline
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                autoOffline ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Max Chats */}
        <div>
          <h2 className="font-medium mb-2">
            Maximum Chats per Agent
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Limit how many conversations an agent can handle
            simultaneously
          </p>

          <input
            type="number"
            value={maxChats}
            min={1}
            onChange={(e) => setMaxChats(e.target.value)}
            className="border rounded-lg px-3 py-2 w-32"
          />
        </div>

        {/* Permissions */}
        <div>
          <h2 className="font-medium mb-3">
            Agent Permissions
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allowTransfer}
                onChange={() =>
                  setAllowTransfer(!allowTransfer)
                }
              />
              <span>Allow chat transfer</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allowClose}
                onChange={() =>
                  setAllowClose(!allowClose)
                }
              />
              <span>Allow agents to close chats</span>
            </label>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h2 className="font-medium mb-2">
            Agent Working Hours
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Used for availability and auto-routing
          </p>

          <div className="flex gap-4 items-center">
            <input
              type="time"
              value={workingHours.start}
              onChange={(e) =>
                setWorkingHours({
                  ...workingHours,
                  start: e.target.value,
                })
              }
              className="border rounded-lg px-3 py-2"
            />
            <span className="text-gray-500">to</span>
            <input
              type="time"
              value={workingHours.end}
              onChange={(e) =>
                setWorkingHours({
                  ...workingHours,
                  end: e.target.value,
                })
              }
              className="border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Save */}
        <div className="pt-4">
          <button
            onClick={saveSettings}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
