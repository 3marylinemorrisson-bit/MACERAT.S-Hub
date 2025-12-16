import { useState } from "react";
import { login } from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      localStorage.setItem("admin_token", data.token);
      alert("Connexion admin réussie");
    } catch {
      setError("Identifiants incorrects");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Connexion Admin</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button>Se connecter</button>
      </form>
    </div>
  );
}

export default App;
