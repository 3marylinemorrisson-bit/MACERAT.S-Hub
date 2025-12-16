import React, { useState } from 'react';
import Login from './Login';
function App() {
  const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem('token')));
  if (!isAuth) return <Login onLogin={() => setIsAuth(true)} />;
  return (<div style={{ padding: 40 }}><h1>MACERAT.S Admin</h1><p>Accès autorisé</p></div>);
}
export default App;
