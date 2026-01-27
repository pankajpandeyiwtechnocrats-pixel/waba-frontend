import { useState } from "react";

export default function NotificationPreferences() {
  const [email, setEmail] = useState({
    campaigns: true,
    liveChat: true,
    billing: true,
  });

  const [whatsapp, setWhatsapp] = useState({
    campaigns: false,
    liveChat: true,
  });

  const [inApp, setInApp] = useState({
    assignments: true,
    mentions: true,
    system: true,
  });

  const saveSettings = () => {
    alert("Notification preferences saved (backend later)");
  };

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">
          Notification Preferences
        </h1>
        <p className="text-sm text-gray-500">
          Choose how and when you receive notifications
        </p>
      </div>

      <div className="p-6 max-w-3xl space-y-10">
        {/* Email Notifications */}
        <div>
          <h2 className="font-medium mb-3">
            Email Notifications
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={email.campaigns}
                onChange={() =>
                  setEmail({
                    ...email,
                    campaigns: !email.campaigns,
                  })
                }
              />
              <span>Campaign updates</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={email.liveChat}
                onChange={() =>
                  setEmail({
                    ...email,
                    liveChat: !email.liveChat,
                  })
                }
              />
              <span>New live chat messages</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={email.billing}
                onChange={() =>
                  setEmail({
                    ...email,
                    billing: !email.billing,
                  })
                }
              />
              <span>Billing & payment alerts</span>
            </label>
          </div>
        </div>

        {/* WhatsApp Notifications */}
        <div>
          <h2 className="font-medium mb-3">
            WhatsApp Notifications
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={whatsapp.campaigns}
                onChange={() =>
                  setWhatsapp({
                    ...whatsapp,
                    campaigns: !whatsapp.campaigns,
                  })
                }
              />
              <span>Campaign status alerts</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={whatsapp.liveChat}
                onChange={() =>
                  setWhatsapp({
                    ...whatsapp,
                    liveChat: !whatsapp.liveChat,
                  })
                }
              />
              <span>New chat assignment</span>
            </label>
          </div>
        </div>

        {/* In-app Notifications */}
        <div>
          <h2 className="font-medium mb-3">
            In-app Notifications
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={inApp.assignments}
                onChange={() =>
                  setInApp({
                    ...inApp,
                    assignments: !inApp.assignments,
                  })
                }
              />
              <span>Chat assignments</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={inApp.mentions}
                onChange={() =>
                  setInApp({
                    ...inApp,
                    mentions: !inApp.mentions,
                  })
                }
              />
              <span>Mentions by agents</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={inApp.system}
                onChange={() =>
                  setInApp({
                    ...inApp,
                    system: !inApp.system,
                  })
                }
              />
              <span>System notifications</span>
            </label>
          </div>
        </div>

        {/* Save */}
        <div className="pt-4">
          <button
            onClick={saveSettings}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
