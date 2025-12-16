import React, { useEffect, useState } from 'react';
import { testBackend } from './api';
function App() {
  const [message, setMessage] = useState('Chargement...');
  useEffect(() => {
    testBackend().then(data => setMessage(data.message))
      .catch(() => setMessage('? Backend non accessible'));
  }, []);
  return (
    <div style={{ padding: 40 }}>
      <h1>MACERAT.S Admin</h1>
      <p>{message}</p>
    </div>
  );
}
export default App;
