import { useState } from "react";

export default function LiveChatSetting() {
  const [autoAssign, setAutoAssign] = useState(true);
  const [autoReply, setAutoReply] = useState(false);
  const [transferEnabled, setTransferEnabled] =
    useState(true);

  const [businessHours, setBusinessHours] = useState({
    start: "09:00",
    end: "18:00",
  });

  const [autoReplyMessage, setAutoReplyMessage] =
    useState(
      "Thanks for reaching out! Our team will get back to you shortly."
    );

  const saveSettings = () => {
    alert("Live chat settings saved (backend later)");
  };

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">
          Live Chat Settings
        </h1>
        <p className="text-sm text-gray-500">
          Configure agent behavior and chat handling rules
        </p>
      </div>

      <div className="p-6 max-w-3xl space-y-8">
        {/* Auto Assignment */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Auto-assign Chats to Agents
            </p>
            <p className="text-sm text-gray-500">
              Automatically assign incoming chats to available
              agents
            </p>
          </div>

          <button
            onClick={() => setAutoAssign(!autoAssign)}
            className={`w-12 h-6 rounded-full relative transition ${
              autoAssign
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                autoAssign ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Auto Reply */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium">
                Auto-reply when offline
              </p>
              <p className="text-sm text-gray-500">
                Send an automatic message outside business
                hours
              </p>
            </div>

            <button
              onClick={() => setAutoReply(!autoReply)}
              className={`w-12 h-6 rounded-full relative transition ${
                autoReply
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                  autoReply ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          {autoReply && (
            <textarea
              value={autoReplyMessage}
              onChange={(e) =>
                setAutoReplyMessage(e.target.value)
              }
              rows={3}
              className="w-full border rounded-lg p-3 text-sm mt-2"
            />
          )}
        </div>

        {/* Business Hours */}
        <div>
          <h2 className="font-medium mb-2">
            Business Hours
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Chats received outside these hours can trigger
            auto-reply
          </p>

          <div className="flex gap-4 items-center">
            <input
              type="time"
              value={businessHours.start}
              onChange={(e) =>
                setBusinessHours({
                  ...businessHours,
                  start: e.target.value,
                })
              }
              className="border rounded-lg px-3 py-2"
            />
            <span className="text-gray-500">to</span>
            <input
              type="time"
              value={businessHours.end}
              onChange={(e) =>
                setBusinessHours({
                  ...businessHours,
                  end: e.target.value,
                })
              }
              className="border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Transfer Settings */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Allow Chat Transfer
            </p>
            <p className="text-sm text-gray-500">
              Agents can transfer chats to other agents
            </p>
          </div>

          <button
            onClick={() =>
              setTransferEnabled(!transferEnabled)
            }
            className={`w-12 h-6 rounded-full relative transition ${
              transferEnabled
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                transferEnabled ? "left-6" : "left-1"
              }`}
            />
          </button>
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
