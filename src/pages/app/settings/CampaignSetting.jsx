import { useState } from "react";

export default function CampaignSetting() {
  const [approvalRequired, setApprovalRequired] =
    useState(true);
  const [retryFailed, setRetryFailed] = useState(true);
  const [sendingSpeed, setSendingSpeed] =
    useState("Normal");

  const [dailyLimit, setDailyLimit] = useState(5000);

  const [quietHours, setQuietHours] = useState({
    start: "22:00",
    end: "08:00",
  });

  const saveSettings = () => {
    alert("Campaign settings saved (backend later)");
  };

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">
          Campaign Settings
        </h1>
        <p className="text-sm text-gray-500">
          Control how WhatsApp campaigns are sent and managed
        </p>
      </div>

      <div className="p-6 max-w-3xl space-y-8">
        {/* Approval Required */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Require Campaign Approval
            </p>
            <p className="text-sm text-gray-500">
              Campaigns must be approved before sending
            </p>
          </div>

          <button
            onClick={() =>
              setApprovalRequired(!approvalRequired)
            }
            className={`w-12 h-6 rounded-full relative transition ${
              approvalRequired
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                approvalRequired ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Sending Speed */}
        <div>
          <h2 className="font-medium mb-2">
            Default Sending Speed
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Controls how fast messages are sent to users
          </p>

          <div className="flex gap-4">
            {["Slow", "Normal", "Fast"].map((speed) => (
              <button
                key={speed}
                onClick={() => setSendingSpeed(speed)}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  sendingSpeed === speed
                    ? "bg-green-100 border-green-600 text-green-700"
                    : "hover:bg-gray-50"
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>

        {/* Retry Failed */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Retry Failed Messages
            </p>
            <p className="text-sm text-gray-500">
              Automatically retry messages that failed to
              deliver
            </p>
          </div>

          <button
            onClick={() => setRetryFailed(!retryFailed)}
            className={`w-12 h-6 rounded-full relative transition ${
              retryFailed
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                retryFailed ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Daily Limit */}
        <div>
          <h2 className="font-medium mb-2">
            Daily Campaign Limit
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Maximum messages allowed per day
          </p>

          <input
            type="number"
            value={dailyLimit}
            onChange={(e) =>
              setDailyLimit(e.target.value)
            }
            className="border rounded-lg px-3 py-2 w-40"
          />
        </div>

        {/* Quiet Hours */}
        <div>
          <h2 className="font-medium mb-2">
            Quiet Hours (Do Not Disturb)
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Messages will not be sent during this time window
          </p>

          <div className="flex gap-4 items-center">
            <input
              type="time"
              value={quietHours.start}
              onChange={(e) =>
                setQuietHours({
                  ...quietHours,
                  start: e.target.value,
                })
              }
              className="border rounded-lg px-3 py-2"
            />
            <span className="text-gray-500">to</span>
            <input
              type="time"
              value={quietHours.end}
              onChange={(e) =>
                setQuietHours({
                  ...quietHours,
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
