import React, { useEffect, useState } from "react";
import { testBackend, login } from "./api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    testBackend()
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Backend non accessible"));
  }, []);

  return (
    <div>
      <h1>Connexion Admin</h1>
      <p>{message}</p>
      <form onSubmit={e => e.preventDefault()}>
        <input placeholder="Email" type="email" />
        <input placeholder="Mot de passe" type="password" />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default App;
