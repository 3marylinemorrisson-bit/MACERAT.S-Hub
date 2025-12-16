import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../api/api";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin().catch(() => {
      navigate("/");
    });
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <p>Accès sécurisé confirmé.</p>
    </div>
  );
}
