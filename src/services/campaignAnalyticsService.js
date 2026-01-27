const API_URL = "http://localhost:5000/api/campaign-analytics";
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
