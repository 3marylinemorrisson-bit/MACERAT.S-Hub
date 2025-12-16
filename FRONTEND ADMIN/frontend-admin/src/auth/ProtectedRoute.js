import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // ❌ Pas de token = dehors
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ Token présent = accès autorisé
  return children;
}
