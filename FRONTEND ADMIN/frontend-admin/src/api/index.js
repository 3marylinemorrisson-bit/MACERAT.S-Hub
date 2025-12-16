const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// LOGIN
export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();

  // 🔥 ICI ET NULLE PART AILLEURS
  localStorage.setItem('adminToken', data.token);

  return data;
}
