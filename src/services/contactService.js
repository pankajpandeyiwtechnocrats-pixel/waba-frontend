const API_URL = "https://waba-backend-wq2d.onrender.com/api/contacts";
const token = () => localStorage.getItem("authToken");

export async function getContacts(projectId) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.json();
}

export async function createContact(projectId, data) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function importContacts(projectId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${API_URL}/import/${projectId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      body: formData,
    }
  );
  return res.json();
}

export function exportContacts(projectId) {
  window.open(
    `${API_URL}/export/${projectId}`,
    "_blank"
  );
}


export async function bulkDeleteContacts(projectId, ids) {
  const res = await fetch(
    `${API_URL}/bulk-delete/${projectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify({ contactIds: ids }),
    }
  );

  return res.json();
}


export async function bulkCreateContacts(projectId, contacts) {
  const res = await fetch(
    `${API_URL}/bulk-create/${projectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify({ contacts }),
    }
  );

  return res.json();
}
