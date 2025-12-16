// ⚠️ Assure-toi que le fichier est en UTF-8 sans BOM

import express from "express";
import cors from "cors";

const app = express();

// 🌐 Activer CORS pour toutes les requêtes
app.use(cors());
app.use(express.json());

// Port du backend
const PORT = 5000;

// ⚠️ Identifiants admin temporaires
const ADMIN_EMAIL = "admin@macerat.s";
const ADMIN_PASSWORD = "admin123";
const ADMIN_TOKEN = "MACERAT_ADMIN_TOKEN";

// ✅ Route test simple
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend MACERAT.S opérationnel !" });
});

// 🔐 Route login admin
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ token: "MACERAT_ADMIN_TOKEN" });
  }

  return res.status(401).json({ error: "Identifiants invalides" });
});

// 🔒 Exemple route protégée
app.get("/api/admin-check", (req, res) => {
  const auth = req.headers.authorization;
  console.log("Authorization header reçu:", auth); // <-- DEBUG
  if (auth === "Bearer MACERAT_ADMIN_TOKEN") {
    return res.json({ ok: true });
  }
  return res.status(403).json({ error: "Accès refusé" });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
