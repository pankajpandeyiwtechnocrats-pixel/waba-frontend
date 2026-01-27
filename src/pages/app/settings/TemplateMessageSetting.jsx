import { useState } from "react";

export default function TemplateMessageSetting() {
  const [approvalMode, setApprovalMode] = useState("Manual");
  const [defaultCategory, setDefaultCategory] =
    useState("Utility");
  const [language, setLanguage] = useState("English");
  const [fallbackEnabled, setFallbackEnabled] =
    useState(true);

  const saveSettings = () => {
    alert(
      "Template message settings saved (backend later)"
    );
  };

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">
          Template Message Settings
        </h1>
        <p className="text-sm text-gray-500">
          Configure default behavior for WhatsApp message
          templates
        </p>
      </div>

      <div className="p-6 max-w-3xl space-y-8">
        {/* Approval Mode */}
        <div>
          <h2 className="font-medium mb-2">
            Template Approval Mode
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Choose how new templates are handled before use
          </p>

          <div className="flex gap-4">
            {["Manual", "Auto"].map((mode) => (
              <button
                key={mode}
                onClick={() => setApprovalMode(mode)}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  approvalMode === mode
                    ? "bg-green-100 border-green-600 text-green-700"
                    : "hover:bg-gray-50"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Default Category */}
        <div>
          <h2 className="font-medium mb-2">
            Default Template Category
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Applied when creating new templates
          </p>

          <select
            value={defaultCategory}
            onChange={(e) =>
              setDefaultCategory(e.target.value)
            }
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-64"
          >
            <option>Utility</option>
            <option>Marketing</option>
            <option>Authentication</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <h2 className="font-medium mb-2">
            Default Language
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Language used for new template creation
          </p>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-64"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Telugu</option>
          </select>
        </div>

        {/* Fallback */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Enable Fallback Message
            </p>
            <p className="text-sm text-gray-500">
              Send fallback text if template is rejected
            </p>
          </div>

          <button
            onClick={() =>
              setFallbackEnabled(!fallbackEnabled)
            }
            className={`w-12 h-6 rounded-full relative transition ${
              fallbackEnabled
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                fallbackEnabled
                  ? "left-6"
                  : "left-1"
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
