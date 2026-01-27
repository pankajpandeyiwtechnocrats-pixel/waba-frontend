const API_URL = "https://waba-backend-wq2d.onrender.com/api/campaigns";
const token = () => localStorage.getItem("authToken");

export async function getCampaigns(projectId) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load campaigns");
  return res.json();
}

export async function createCampaign(projectId, data) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create campaign");
  return res.json();
}
