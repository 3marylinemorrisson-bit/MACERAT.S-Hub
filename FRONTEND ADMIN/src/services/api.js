// src/services/api.js
import axios from "axios";

// Création d'une instance Axios
// baseURL = backend défini dans .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ← variable d'environnement
  withCredentials: true, // pour envoyer cookies si nécessaire
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token admin automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
