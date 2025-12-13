import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const token = localStorage.getItem("admin_token");
  const API = "https://macerat-s-backend.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, enrollmentsRes] = await Promise.all([
        fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch(`${API}/admin/enrollments`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      ]);
      setUsers(usersRes);
      setEnrollments(enrollmentsRes);
    };
    fetchData();
  }, [token]);

  const getUserEnrollments = (email) =>
    enrollments.filter(e => e.user_email === email);

  return (
    <div>
      <h1>Utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.email}</strong> — Role: {user.role}
            <ul>
              {getUserEnrollments(user.email).map(e => (
                <li key={e.id}>Inscrit à : {e.formation_id}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
