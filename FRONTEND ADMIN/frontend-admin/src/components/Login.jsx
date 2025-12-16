import React, { useState } from 'react';
import { login } from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password);
      onLogin(data.token);
    } catch {
      setError('❌ Email ou mot de passe incorrect');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Connexion Admin</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
        <input type='password' placeholder='Mot de passe' value={password} onChange={e => setPassword(e.target.value)} required />
        <button type='submit'>Se connecter</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}


