import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// ⚠️ Admin temporaire
const ADMIN_EMAIL = "admin@macerat.s";
const ADMIN_PASSWORD = "admin123";

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend MACERAT.S opérationnel !" });
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ token: "MACERAT_ADMIN_TOKEN" });
  }
  return res.status(401).json({ error: "Identifiants invalides" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
