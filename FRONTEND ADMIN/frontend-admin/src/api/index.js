const API_URL = "http://localhost:5000";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function checkAdmin(token) {
  const res = await fetch(`${API_URL}/api/admin-check`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.ok;
}
