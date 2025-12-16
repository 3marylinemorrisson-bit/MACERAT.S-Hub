import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      alert("Identifiants incorrects");
    }
  };

  return (
    <div>
      <h2>Connexion Admin</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}
