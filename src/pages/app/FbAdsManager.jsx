import { useState } from "react";
import {
  Facebook,
  RefreshCcw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function FbAdsManager() {
  const [connected, setConnected] = useState(false);

  const adAccount = {
    id: "ACT_987654321",
    name: "My Business Ad Account",
    lastSync: "5 mins ago",
  };

  const campaigns = [
    {
      id: 1,
      name: "Diwali Sale Campaign",
      objective: "Traffic",
      status: "Active",
    },
    {
      id: 2,
      name: "Lead Generation – Jan",
      objective: "Leads",
      status: "Paused",
    },
  ];

  return (
    <div className="bg-white rounded-xl border h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h1 className="text-lg font-semibold">
            Facebook Ads Manager
          </h1>
          <p className="text-sm text-gray-500">
            Sync and manage Facebook ad campaigns
          </p>
        </div>

        {connected && (
          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
            onClick={() => alert("Syncing ads...")}
          >
            <RefreshCcw size={16} />
            Sync Now
          </button>
        )}
      </div>

      {/* Content */}
      {!connected ? (
        /* NOT CONNECTED */
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <Facebook size={48} className="text-blue-600 mb-4" />
          <h2 className="text-lg font-semibold mb-2">
            Connect your Facebook Ad Account
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Connect your Meta ad account to sync campaigns and
            send WhatsApp messages from ads.
          </p>
          <button
            onClick={() => setConnected(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
          >
            Connect Facebook Account
          </button>
        </div>
      ) : (
        /* CONNECTED */
        <div className="flex-1 overflow-auto">
          {/* Ad Account Info */}
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Connected Ad Account
              </p>
              <p className="font-medium">
                {adAccount.name}
              </p>
              <p className="text-xs text-gray-400">
                {adAccount.id}
              </p>
            </div>

            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle size={16} />
              Connected
            </div>
          </div>

          {/* Campaigns */}
          <div className="p-6">
            <h3 className="font-semibold mb-4">
              Ad Campaigns
            </h3>

            {campaigns.length === 0 ? (
              <div className="text-gray-400">
                No campaigns found
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-3">
                      Campaign Name
                    </th>
                    <th className="text-left px-4 py-3">
                      Objective
                    </th>
                    <th className="text-left px-4 py-3">
                      Status
                    </th>
                    <th className="text-left px-4 py-3">
                      Sync Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium">
                        {c.name}
                      </td>
                      <td className="px-4 py-3">
                        {c.objective}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            c.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        Synced {adAccount.lastSync}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
