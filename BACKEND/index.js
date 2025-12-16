import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend MACERAT.S opérationnel !" });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ token: 'ADMIN_TOKEN_OK' });
  }

  return res.status(401).json({ error: 'Identifiants invalides' });
});

app.listen(10000, () => {
  console.log('Server running on port 10000');
});
