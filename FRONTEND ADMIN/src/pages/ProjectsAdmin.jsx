import { useEffect, useState } from "react";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("admin_token");
  const API = "https://macerat-s-backend.onrender.com";

  useEffect(() => {
    fetch(`${API}/admin/projects`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setProjects);
  }, []);

  const uploadFile = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API}/admin/upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
    const data = await res.json();
    return data.url;
  };

  const handleCreate = async () => {
    const fileUrl = await uploadFile();
    const res = await fetch(`${API}/admin/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description, image: fileUrl })
    });
    const newProject = await res.json();
    setProjects([...projects, newProject]);
    setTitle(""); setDescription(""); setFile(null);
  };

  const deleteProject = async (id) => {
    await fetch(`${API}/admin/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div>
      <h1>Projets</h1>
      <input type="text" placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleCreate}>Créer</button>

      <ul>
        {projects.map(p => (
          <li key={p.id}>
            <img src={p.image} alt={p.title} width={100} />
            {p.title} <button onClick={() => deleteProject(p.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsAdmin;
