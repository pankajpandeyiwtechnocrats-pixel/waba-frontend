import { useEffect, useState } from "react";
import { getCampaignAnalytics } from "../services/campaignAnalyticsService";

export default function CampaignAnalytics({ campaignId }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!campaignId) return;

    getCampaignAnalytics(campaignId).then(setStats);
  }, [campaignId]);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
      <Stat title="Total" value={stats.total} />
      <Stat title="Sent" value={stats.sent} />
      <Stat title="Delivered" value={stats.delivered} />
      <Stat title="Read" value={stats.read} />
      <Stat title="Failed" value={stats.failed} />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
