const API_URL = "https://waba-backend-wq2d.onrender.com/api/dashboard";

const getToken = () =>
  localStorage.getItem("authToken");

export async function getDashboardStats(projectId) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load dashboard");
  }

  return res.json();
}
