export async function login(email, password) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function testBackend() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/test`);
  return res.json();
}
