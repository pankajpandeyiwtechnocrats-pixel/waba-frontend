export default function Analytics() {
  const stats = [
    {
      label: "Messages Sent",
      value: "12,480",
      change: "+12%",
    },
    {
      label: "Active Conversations",
      value: "324",
      change: "+8%",
    },
    {
      label: "Campaign Messages",
      value: "5,920",
      change: "+15%",
    },
    {
      label: "Response Rate",
      value: "92%",
      change: "+3%",
    },
  ];

  const messageTrend = [
    { day: "Mon", value: 1200 },
    { day: "Tue", value: 1500 },
    { day: "Wed", value: 1100 },
    { day: "Thu", value: 1800 },
    { day: "Fri", value: 2100 },
    { day: "Sat", value: 900 },
    { day: "Sun", value: 1300 },
  ];

  const maxValue = Math.max(
    ...messageTrend.map((d) => d.value)
  );

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold">Analytics</h1>
          <p className="text-sm text-gray-500">
            Overview of messaging and campaign performance
          </p>
        </div>

        <select className="border rounded-lg px-3 py-2 text-sm w-fit">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="p-6 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border rounded-xl p-4"
            >
              <p className="text-sm text-gray-500">
                {s.label}
              </p>
              <p className="text-2xl font-semibold mt-1">
                {s.value}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {s.change} from last period
              </p>
            </div>
          ))}
        </div>

        {/* Message Trend Chart (UI version) */}
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Message Trend
          </h2>

          <div className="flex items-end gap-4 h-48">
            {messageTrend.map((d) => (
              <div
                key={d.day}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-8 bg-green-600 rounded-t-lg"
                  style={{
                    height: `${
                      (d.value / maxValue) * 100
                    }%`,
                  }}
                />
                <span className="text-xs text-gray-500">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold mb-3">
              Campaign Performance
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Delivered</span>
                <span className="font-medium">
                  94%
                </span>
              </li>
              <li className="flex justify-between">
                <span>Read</span>
                <span className="font-medium">
                  82%
                </span>
              </li>
              <li className="flex justify-between">
                <span>Failed</span>
                <span className="font-medium">
                  6%
                </span>
              </li>
            </ul>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-semibold mb-3">
              Channel Split
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Live Chat</span>
                <span className="font-medium">
                  48%
                </span>
              </li>
              <li className="flex justify-between">
                <span>Campaigns</span>
                <span className="font-medium">
                  37%
                </span>
              </li>
              <li className="flex justify-between">
                <span>Automation</span>
                <span className="font-medium">
                  15%
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
