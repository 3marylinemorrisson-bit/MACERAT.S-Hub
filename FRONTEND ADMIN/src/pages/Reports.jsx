import React from "react";

const API_BASE = "https://macerat-s-backend.onrender.com";

export default function Reports() {
  const token = localStorage.getItem("admin_token");

  const downloadEnrollments = () => {
    if (!token) {
      alert("Non autorisé");
      return;
    }

    // Téléchargement direct du CSV
    window.location.href = `${API_BASE}/admin/export/enrollments?token=${token}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Rapports & Exports
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <p className="mb-4 text-gray-700">
          Télécharger la liste complète des inscriptions
        </p>

        <button
          onClick={downloadEnrollments}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Télécharger le CSV des inscriptions
        </button>
      </div>
    </div>
  );
}
