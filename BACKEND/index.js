import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password123";

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend MACERAT.S opérationnel !" });
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ token: "ADMIN_TOKEN_OK" });
  }

  return res.status(401).json({ error: "Identifiants invalides" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
