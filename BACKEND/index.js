import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// ⚠️ IDENTIFIANTS ADMIN (TEMPORAIRE)
const ADMIN_EMAIL = "admin@macerat.s";
const ADMIN_PASSWORD = "admin123";

// 🔐 LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      token: "MACERAT_ADMIN_TOKEN",
    });
  }

  return res.status(401).json({ error: "Identifiants invalides" });
});

// 🔒 ROUTE PROTÉGÉE
app.get("/api/admin-check", (req, res) => {
  const auth = req.headers.authorization;

  if (auth === "Bearer MACERAT_ADMIN_TOKEN") {
    return res.json({ ok: true });
  }

  return res.status(403).json({ error: "Accès refusé" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
