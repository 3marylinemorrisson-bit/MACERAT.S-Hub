import express from "express";
import cors from "cors";

const app = express();

// ✅ Active CORS pour tout le monde
app.use(cors());

// JSON parsing
app.use(express.json());

// Tes routes ici
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend MACERAT.S opérationnel !" });
});

// Exemple login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@macerat.s" && password === "admin123") {
    return res.json({ token: "MACERAT_ADMIN_TOKEN" });
  }
  return res.status(401).json({ error: "Identifiants invalides" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
