import { useState } from "react";

export default function OptinManagement() {
  const [enabled, setEnabled] = useState(true);
  const [methods, setMethods] = useState({
    whatsapp: true,
    website: true,
    qr: false,
    api: false,
  });

  const [message, setMessage] = useState(
    "Hi! Please reply YES to receive updates on WhatsApp."
  );

  const saveSettings = () => {
    alert("Opt-in settings saved (backend later)");
  };

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">
          Opt-in Management
        </h1>
        <p className="text-sm text-gray-500">
          Manage customer consent for WhatsApp messaging
        </p>
      </div>

      <div className="p-6 max-w-3xl space-y-8">
        {/* Enable Opt-in */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Require Opt-in</p>
            <p className="text-sm text-gray-500">
              Customers must give consent before receiving
              WhatsApp messages
            </p>
          </div>

          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 rounded-full relative transition ${
              enabled ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                enabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Opt-in Methods */}
        <div>
          <h2 className="font-medium mb-3">
            Opt-in Methods
          </h2>

          <div className="space-y-3">
            {[
              { key: "whatsapp", label: "WhatsApp Message" },
              { key: "website", label: "Website Form" },
              { key: "qr", label: "QR Code" },
              { key: "api", label: "API" },
            ].map((m) => (
              <label
                key={m.key}
                className="flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={methods[m.key]}
                  onChange={() =>
                    setMethods({
                      ...methods,
                      [m.key]: !methods[m.key],
                    })
                  }
                  className="w-4 h-4"
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Opt-in Message */}
        <div>
          <h2 className="font-medium mb-2">
            Default Opt-in Message
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            This message will be sent to users to collect
            consent
          </p>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border rounded-lg p-3 text-sm"
          />
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
