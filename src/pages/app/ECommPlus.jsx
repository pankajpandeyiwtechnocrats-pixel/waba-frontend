import { useState } from "react";
import {
  ShoppingCart,
  CheckCircle,
  Send,
  Link2,
} from "lucide-react";

export default function ECommPlus() {
  const [connected, setConnected] = useState(false);

  const store = {
    name: "My Online Store",
    platform: "Shopify",
  };

  const stats = [
    { label: "Orders Today", value: 12 },
    { label: "Pending Orders", value: 4 },
    { label: "Abandoned Carts", value: 7 },
  ];

  const orders = [
    {
      id: "#ORD1021",
      customer: "Rahul Sharma",
      amount: "₹1,299",
      status: "Pending",
    },
    {
      id: "#ORD1020",
      customer: "Anita Verma",
      amount: "₹2,499",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-white rounded-xl border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">EComm+</h1>
        <p className="text-sm text-gray-500">
          Connect your eCommerce store and automate WhatsApp updates
        </p>
      </div>

      {!connected ? (
        /* NOT CONNECTED */
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <ShoppingCart size={48} className="text-green-600 mb-4" />
          <h2 className="text-lg font-semibold mb-2">
            Connect your eCommerce store
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Sync orders, track abandoned carts, and send real-time
            WhatsApp updates to customers.
          </p>
          <button
            onClick={() => setConnected(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
          >
            Connect Store
          </button>
        </div>
      ) : (
        /* CONNECTED */
        <div className="flex-1 overflow-auto">
          {/* Store Info */}
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Connected Store
              </p>
              <p className="font-medium">{store.name}</p>
              <p className="text-xs text-gray-400">
                Platform: {store.platform}
              </p>
            </div>

            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle size={16} />
              Connected
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="border rounded-xl p-4"
              >
                <p className="text-sm text-gray-500">
                  {s.label}
                </p>
                <p className="text-2xl font-semibold">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Orders */}
          <div className="p-6">
            <h3 className="font-semibold mb-4">
              Recent Orders
            </h3>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left px-4 py-3">
                    Order ID
                  </th>
                  <th className="text-left px-4 py-3">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3">
                    Status
                  </th>
                  <th className="text-left px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {o.id}
                    </td>
                    <td className="px-4 py-3">
                      {o.customer}
                    </td>
                    <td className="px-4 py-3">
                      {o.amount}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          o.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="flex items-center gap-1 text-xs text-green-600"
                          title="Send WhatsApp update"
                        >
                          <Send size={14} />
                          WhatsApp
                        </button>
                        <button
                          className="flex items-center gap-1 text-xs text-gray-600"
                          title="View order"
                        >
                          <Link2 size={14} />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
