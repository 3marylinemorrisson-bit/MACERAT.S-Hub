import React, { useEffect, useState } from 'react';
import { testBackend } from '../api';

export default function Dashboard() {
  const [message, setMessage] = useState('Chargement...');

  useEffect(() => {
    testBackend().then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Dashboard Admin</h1>
      <p>{message}</p>
    </div>
  );
}

