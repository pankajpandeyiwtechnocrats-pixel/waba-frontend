import { useState } from "react";
import {
  Plug,
  MessageCircle,
  ShoppingCart,
  Webhook,
  CreditCard,
  CheckCircle,
} from "lucide-react";

const integrationsList = [
  {
    id: "whatsapp",
    name: "WhatsApp Business API",
    description: "Send and receive WhatsApp messages",
    category: "Messaging",
    icon: MessageCircle,
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Sync orders and customers",
    category: "E-Commerce",
    icon: ShoppingCart,
  },
  {
    id: "webhook",
    name: "Webhooks",
    description: "Trigger events to external systems",
    category: "Developers",
    icon: Webhook,
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Accept and track payments",
    category: "Payments",
    icon: CreditCard,
  },
];

export default function Integrations() {
  const [connected, setConnected] = useState([]);

  const toggleIntegration = (id) => {
    setConnected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">Integrations</h1>
        <p className="text-sm text-gray-500">
          Connect external services to extend your platform
        </p>
      </div>

      {/* Content */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto">
        {integrationsList.map((item) => {
          const Icon = item.icon;
          const isConnected = connected.includes(item.id);

          return (
            <div
              key={item.id}
              className="border rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition"
            >
              {/* Top */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Icon size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.category}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>

              {/* Action */}
              <div className="mt-4">
                {isConnected ? (
                  <button
                    onClick={() => toggleIntegration(item.id)}
                    className="flex items-center gap-2 text-sm text-green-600"
                  >
                    <CheckCircle size={16} />
                    Connected (Disconnect)
                  </button>
                ) : (
                  <button
                    onClick={() => toggleIntegration(item.id)}
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
