// src/App.js
import React, { useState } from "react";
import { login } from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await login(email, password);
      setMessage("✅ Connexion réussie ! Token : " + data.token);
    } catch (err) {
      setMessage("❌ Identifiants invalides ou backend inaccessible");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h1>Connexion Admin</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 10 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default App;
