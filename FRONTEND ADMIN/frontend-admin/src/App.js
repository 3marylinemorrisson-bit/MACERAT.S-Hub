import React, { useState } from "react";
import { login, checkAdmin } from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Connexion en cours...");
    try {
      const result = await login(email, password);
      localStorage.setItem("adminToken", result.token);
      setMessage("✅ Connexion réussie !");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  const handleCheckAdmin = async () => {
    try {
      const result = await checkAdmin();
      setMessage(result.ok ? "✅ Accès admin confirmé" : "❌ Accès refusé");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Connexion Admin</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: "100%", padding: 8 }}>
          Se connecter
        </button>
      </form>
      <button
        onClick={handleCheckAdmin}
        style={{ marginTop: 10, width: "100%", padding: 8 }}
      >
        Vérifier accès admin
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
