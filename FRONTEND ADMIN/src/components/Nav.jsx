import React from "react";

export default function Nav({onRoute, logout}){
  return (
    <nav className="bg-white shadow p-3 flex items-center justify-between">
      <div className="flex gap-3">
        <button onClick={()=>onRoute("dashboard")} className="px-3 py-1">Dashboard</button>
        <button onClick={()=>onRoute("users")} className="px-3 py-1">Utilisateurs</button>
        <button onClick={()=>onRoute("formations")} className="px-3 py-1">Formations</button>
        <button onClick={()=>onRoute("projects")} className="px-3 py-1">Projets</button>
        <button onClick={()=>onRoute("reports")} className="px-3 py-1">Rapports</button>
      </div>
      <div>
        <button onClick={logout} className="text-red-600">Déconnexion</button>
      </div>
    </nav>
  );
}
