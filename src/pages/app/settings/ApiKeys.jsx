import { useState } from "react";
import { Copy, RefreshCcw, Key } from "lucide-react";

export default function ApiKeys() {
  const [enabled, setEnabled] = useState(true);
  const [apiKey, setApiKey] = useState(
    "waba_live_xxxxxxxxxxxxxxxxx"
  );

  const generateKey = () => {
    const newKey =
      "waba_live_" +
      Math.random().toString(36).substring(2, 18);
    setApiKey(newKey);
    alert("New API key generated");
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    alert("API key copied");
  };

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">API Keys</h1>
        <p className="text-sm text-gray-500">
          Manage API access for integrations and external
          services
        </p>
      </div>

      <div className="p-6 max-w-3xl space-y-8">
        {/* Enable API */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Enable API Access
            </p>
            <p className="text-sm text-gray-500">
              Allow external systems to access your project
              using API keys
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

        {/* API Key Box */}
        <div>
          <h2 className="font-medium mb-2">
            API Key
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Use this key to authenticate API requests
          </p>

          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50">
            <Key size={18} className="text-gray-500" />
            <code className="flex-1 text-sm truncate">
              {enabled ? apiKey : "API access disabled"}
            </code>

            {enabled && (
              <>
                <button
                  onClick={copyKey}
                  title="Copy"
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <Copy size={16} />
                </button>

                <button
                  onClick={generateKey}
                  title="Regenerate"
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <RefreshCcw size={16} />
                </button>
              </>
            )}
          </div>

          <p className="text-xs text-red-600 mt-2">
            ⚠️ Keep your API key secret. Do not share it
            publicly.
          </p>
        </div>

        {/* Usage Info */}
        <div className="border rounded-xl p-4 bg-gray-50">
          <p className="font-medium mb-1">
            API Usage
          </p>
          <p className="text-sm text-gray-500">
            Use the API key in request headers:
          </p>
          <code className="block mt-2 text-sm bg-white border rounded p-3">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>
      </div>
    </div>
  );
}
