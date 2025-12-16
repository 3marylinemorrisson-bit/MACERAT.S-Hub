const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// 🔐 Login
export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();

  // ⚡ Stocker le token dans localStorage
  localStorage.setItem('adminToken', data.token);

  return data;
}

// ✅ Vérification admin
export async function checkAdmin() {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Pas de token stocké');

  const res = await fetch(`${API_URL}/api/admin-check`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Accès admin refusé');
  return res.json();
}
