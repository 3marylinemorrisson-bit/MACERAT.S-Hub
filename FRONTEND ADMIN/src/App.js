"import React, { useEffect, useState } from 'react';
function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch(\`\${process.env.REACT_APP_API_URL}/api/test\`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Erreur : impossible de contacter le backend'));
  }, []);
  return (<div style={{ padding: '50px', textAlign: 'center' }}>
    <h1>Frontend Admin MACERAT.S</h1>
    <p>{message}</p>
  </div>);
}
export default App;"