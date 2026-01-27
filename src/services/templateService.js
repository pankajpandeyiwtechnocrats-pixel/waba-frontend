const API_URL = "http://localhost:5000/api/templates";

const token = () => localStorage.getItem("authToken");

export async function getTemplates(projectId) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load templates");
  return res.json();
}

export async function createTemplate(projectId, data) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create template");
  return res.json();
}
