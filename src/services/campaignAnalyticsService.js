const API_URL = "https://waba-backend-2.onrender.com/api/campaign-analytics";
const token = () => localStorage.getItem("authToken");

export async function getCampaignAnalytics(campaignId) {
  const res = await fetch(`${API_URL}/${campaignId}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load analytics");
  }

  return res.json();
}
