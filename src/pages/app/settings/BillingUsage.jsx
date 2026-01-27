export default function BillingUsage() {
  const plan = {
    name: "Basic",
    price: "₹999 / month",
    renewal: "15 Feb 2026",
  };

  const usage = [
    {
      label: "Messages Sent",
      used: 12480,
      limit: 20000,
    },
    {
      label: "Active Conversations",
      used: 324,
      limit: 1000,
    },
    {
      label: "API Calls",
      used: 1820,
      limit: 5000,
    },
  ];

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">
          Billing & Usage
        </h1>
        <p className="text-sm text-gray-500">
          Manage your subscription and track usage
        </p>
      </div>

      <div className="p-6 max-w-4xl space-y-8">
        {/* Current Plan */}
        <div className="border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Current Plan
            </p>
            <p className="text-xl font-semibold">
              {plan.name}
            </p>
            <p className="text-sm text-gray-500">
              {plan.price}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Renews on {plan.renewal}
            </p>
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm">
            Upgrade Plan
          </button>
        </div>

        {/* Usage */}
        <div>
          <h2 className="font-medium mb-4">
            Usage Summary
          </h2>

          <div className="space-y-4">
            {usage.map((u) => {
              const percent = Math.min(
                (u.used / u.limit) * 100,
                100
              );

              return (
                <div
                  key={u.label}
                  className="border rounded-xl p-4"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span>{u.label}</span>
                    <span className="text-gray-500">
                      {u.used} / {u.limit}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing History */}
        <div>
          <h2 className="font-medium mb-3">
            Billing History
          </h2>

          <div className="border rounded-xl p-4 text-sm text-gray-500">
            No invoices available yet
          </div>
        </div>
      </div>
    </div>
  );
}
