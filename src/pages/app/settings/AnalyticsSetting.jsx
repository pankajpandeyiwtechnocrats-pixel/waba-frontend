import { useState } from "react";

export default function AnalyticsSetting() {
  const [analyticsEnabled, setAnalyticsEnabled] =
    useState(true);
  const [trackResponseTime, setTrackResponseTime] =
    useState(true);
  const [trackResolutionTime, setTrackResolutionTime] =
    useState(true);
  const [trackAgentPerformance, setTrackAgentPerformance] =
    useState(true);
  const [trackCampaignAnalytics, setTrackCampaignAnalytics] =
    useState(true);

  const [retentionDays, setRetentionDays] =
    useState(90);

  const saveSettings = () => {
    alert("Analytics settings saved (backend later)");
  };

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">
          Analytics Settings
        </h1>
        <p className="text-sm text-gray-500">
          Control what data is tracked, stored, and displayed
          in analytics
        </p>
      </div>

      <div className="p-6 max-w-3xl space-y-8">
        {/* Enable Analytics */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Enable Analytics Tracking
            </p>
            <p className="text-sm text-gray-500">
              Turn analytics collection on or off for this
              project
            </p>
          </div>

          <button
            onClick={() =>
              setAnalyticsEnabled(!analyticsEnabled)
            }
            className={`w-12 h-6 rounded-full relative transition ${
              analyticsEnabled
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                analyticsEnabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Conversation Metrics */}
        <div>
          <h2 className="font-medium mb-3">
            Conversation Metrics
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={trackResponseTime}
                onChange={() =>
                  setTrackResponseTime(
                    !trackResponseTime
                  )
                }
              />
              <span>Track response time</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={trackResolutionTime}
                onChange={() =>
                  setTrackResolutionTime(
                    !trackResolutionTime
                  )
                }
              />
              <span>Track resolution time</span>
            </label>
          </div>
        </div>

        {/* Agent Analytics */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Agent Performance Analytics
            </p>
            <p className="text-sm text-gray-500">
              Track agent activity, workload, and efficiency
            </p>
          </div>

          <button
            onClick={() =>
              setTrackAgentPerformance(
                !trackAgentPerformance
              )
            }
            className={`w-12 h-6 rounded-full relative transition ${
              trackAgentPerformance
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                trackAgentPerformance
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Campaign Analytics */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Campaign Analytics
            </p>
            <p className="text-sm text-gray-500">
              Track delivery, read rates, and failures for
              campaigns
            </p>
          </div>

          <button
            onClick={() =>
              setTrackCampaignAnalytics(
                !trackCampaignAnalytics
              )
            }
            className={`w-12 h-6 rounded-full relative transition ${
              trackCampaignAnalytics
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                trackCampaignAnalytics
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Data Retention */}
        <div>
          <h2 className="font-medium mb-2">
            Data Retention Period
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            How long analytics data should be stored
          </p>

          <select
            value={retentionDays}
            onChange={(e) =>
              setRetentionDays(e.target.value)
            }
            className="border rounded-lg px-3 py-2 w-48"
          >
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
            <option value={180}>180 days</option>
            <option value={365}>1 year</option>
          </select>
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
