import React, { useState, useEffect } from 'react';
import { testBackend, login } from './api';

function App() {
  const [backendStatus, setBackendStatus] = useState('Chargement du backend...');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // VÃ©rification du backend au chargement
  useEffect(() => {
    testBackend()
      .then(data => setBackendStatus(data.message))
      .catch(() => setBackendStatus('âŒ Backend non accessible'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password);
      console.log('Connexion rÃ©ussie:', data);
      setIsLoggedIn(true);
    } catch {
      setError('Email ou mot de passe incorrect');
    }
  };

  // Dashboard simulÃ© aprÃ¨s connexion
  if (isLoggedIn) {
    return (
      <div style={{ padding: '40px' }}>
        <h1>Bienvenue dans le Dashboard Admin</h1>
        <p>{backendStatus}</p>
        <p>Vous Ãªtes connectÃ©(e) en tant que <b>{email}</b></p>
      </div>
    );
  }

  // Formulaire de connexion
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Connexion Admin</h2>
      <p>{backendStatus}</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Mot de passe</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Se connecter</button>
      </form>
    </div>
  );
}

export default App;

