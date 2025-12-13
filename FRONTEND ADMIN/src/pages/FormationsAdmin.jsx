import { useEffect, useState } from "react";

const FormationsAdmin = () => {
  const [formations, setFormations] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("admin_token");
  const API = "https://macerat-s-backend.onrender.com";

  useEffect(() => {
    fetch(`${API}/admin/formations`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setFormations);
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
    const res = await fetch(`${API}/admin/formations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description, image: fileUrl })
    });
    const newFormation = await res.json();
    setFormations([...formations, newFormation]);
    setTitle(""); setDescription(""); setFile(null);
  };

  const deleteFormation = async (id) => {
    await fetch(`${API}/admin/formations/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setFormations(formations.filter(f => f.id !== id));
  };

  return (
    <div>
      <h1>Formations</h1>
      <input type="text" placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleCreate}>Créer</button>

      <ul>
        {formations.map(f => (
          <li key={f.id}>
            {f.title} <button onClick={() => deleteFormation(f.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormationsAdmin;
