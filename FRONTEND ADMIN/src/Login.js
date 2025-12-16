import React, { useState } from 'react';
import { login } from './api';
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { const data = await login(email, password); localStorage.setItem('token', data.token); onLogin(); } 
    catch { setError('Accès refusé'); }
  };
  return (
    <div style={{ padding: 40 }}>
      <h2>Connexion Admin</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
        <input type='password' placeholder='Mot de passe' value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
        <button type='submit'>Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
export default Login;
