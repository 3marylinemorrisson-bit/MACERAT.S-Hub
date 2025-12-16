import React from "react";

export default function AdminPage({ token }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenue Admin !</h1>
      <p>Votre token : <code>{token}</code></p>
      <p>Ici, vous pourrez gérer le backend et les données.</p>
    </div>
  );
}
