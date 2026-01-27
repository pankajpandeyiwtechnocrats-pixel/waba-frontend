const API_URL = "http://localhost:5000/api/projects";

const getToken = () =>
  localStorage.getItem("authToken");

export async function createProject(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
}

export async function getProjects() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}



export async function getProjectById(projectId) {
  const res = await fetch(
    `http://localhost:5000/api/projects/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  return res.json();
}
