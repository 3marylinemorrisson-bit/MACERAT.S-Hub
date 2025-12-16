import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [token, setToken] = useState(null);

  return token ? <Dashboard /> : <Login onLogin={setToken} />;
}
