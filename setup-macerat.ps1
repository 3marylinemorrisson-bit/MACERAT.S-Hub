# ⚡ Setup complet MACERAT.S

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Host "🔹 Création des dossiers..."
$dirs = @("backend", "frontend", "frontend/src")
foreach ($d in $dirs) {
    $path = Join-Path $root $d
    if (!(Test-Path $path)) { New-Item -Path $path -ItemType Directory | Out-Null }
}

# -----------------------------
# 1️⃣ Backend
# -----------------------------
Write-Host "🔹 Création fichiers backend..."
$backendPackage = @"
{
  "name": "macerat-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": { "start": "node index.js" },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2"
  }
}
"@
Set-Content -Path "$root\backend\package.json" -Value $backendPackage -Encoding UTF8

$backendIndex = @"
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 10000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend opérationnel !' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@macerat.com' && password === 'password123') {
    return res.json({ success: true, token: 'fake-jwt-token' });
  }
  res.status(401).json({ success: false, message: 'Login failed' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
"@
Set-Content -Path "$root\backend\index.js" -Value $backendIndex -Encoding UTF8

# -----------------------------
# 2️⃣ Frontend
# -----------------------------
Write-Host "🔹 Création fichiers frontend..."
$frontendPackage = @"
{
  "name": "macerat-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
"@
Set-Content -Path "$root\frontend\package.json" -Value $frontendPackage -Encoding UTF8

$frontendEnv = "REACT_APP_API_URL=http://localhost:10000"
Set-Content -Path "$root\frontend\.env" -Value $frontendEnv -Encoding UTF8

$apiJs = @"
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

export async function testBackend() {
  const res = await fetch(\`\${API_URL}/api/test\`);
  if (!res.ok) throw new Error('Backend inaccessible');
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(\`\${API_URL}/api/login\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}
"@
Set-Content -Path "$root\frontend\src\api.js" -Value $apiJs -Encoding UTF8

$appJs = @"
import React, { useEffect, useState } from 'react';
import { testBackend, login } from './api';

export default function App() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    testBackend()
      .then(res => setMessage(res.message))
      .catch(err => setMessage(err.message));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      alert('Login réussi: ' + JSON.stringify(res));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>MACERAT.S Admin</h1>
      <p>{message}</p>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} /><br/><br/>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
"@
Set-Content -Path "$root\frontend\src\App.jsx" -Value $appJs -Encoding UTF8

$indexJs = @"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
"@
Set-Content -Path "$root\frontend\src\index.jsx" -Value $indexJs -Encoding UTF8

# -----------------------------
# 3️⃣ Installer les dépendances
# -----------------------------
Write-Host "🔹 Installation backend..."
cd "$root\backend"
npm install

Write-Host "🔹 Installation frontend..."
cd "$root\frontend"
npm install

# -----------------------------
# 4️⃣ Lancer backend et frontend
# -----------------------------
Write-Host "🔹 Lancement backend..."
Start-Process "powershell" "-NoExit -Command 'cd $root\backend; npm start'"

Write-Host "🔹 Lancement frontend..."
Start-Process "powershell" "-NoExit -Command 'cd $root\frontend; npm start'"

Write-Host "✅ Setup terminé ! Ouvre le navigateur sur http://localhost:3000"
