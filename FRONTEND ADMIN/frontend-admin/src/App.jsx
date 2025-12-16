import React, { useState, useEffect } from "react";
import { login, checkAdmin } from "./api";
import AdminPage from "./AdminPage";
import { login, checkAdmin } from './api';

async function handleLogin(email, password) {
  try {
    await login(email, password);

    // Vérifier immédiatement l’accès admin
    const adminData = await checkAdmin();
    console.log('✅ Accès admin confirmé :', adminData);
    alert('Connexion Admin réussie !');

  } catch (err) {
    console.error(err);
    alert(err.message); // Affiche "Accès admin refusé" si le token est incorrect
  }
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      setToken(data.token);
      localStorage.setItem("adminToken", data.token);
      setMessage("✅ Login réussi !");
    } catch (err) {
      setMessage("❌ Identifiants invalides");
      setToken("");
    }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
    setMessage("Vous êtes déconnecté.");
  };

  useEffect(() => {
    if (token) {
      checkAdmin(token).catch(() => {
        setMessage("❌ Token invalide, reconnectez-vous.");
        handleLogout();
      });
    }
  }, [token]);

  if (token) {
    return (
      <div>
        <AdminPage token={token} />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handleLogout}>Se déconnecter</button>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Connexion Admin</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%" }}>Se connecter</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
