
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [counts, setCounts] = useState({ users: 0, formations: 0, projects: 0, enrollments: 0 });
  const token = localStorage.getItem("admin_token");
  const API = "https://macerat-s-backend.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      const [users, formations, projects, enrollments] = await Promise.all([
        fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch(`${API}/admin/formations`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch(`${API}/admin/projects`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch(`${API}/admin/enrollments`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      ]);
      setCounts({ users: users.length, formations: formations.length, projects: projects.length, enrollments: enrollments.length });
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Utilisateurs : {counts.users}</p>
      <p>Formations : {counts.formations}</p>
      <p>Projets : {counts.projects}</p>
      <p>Inscriptions : {counts.enrollments}</p>
    </div>
  );
};

export default Dashboard;

