const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Identifiants invalides');
  return res.json(); // { token: "MACERAT_ADMIN_TOKEN" }
}

export async function checkAdmin() {
  const token = localStorage.getItem('adminToken');
  const res = await fetch(`${API_URL}/api/admin-check`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Accès refusé');
  return res.json(); // { ok: true }
}
