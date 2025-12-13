import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">
        Admin MACERAT.S
      </h2>

      <nav className="flex flex-col space-y-3">
        <Link
          to="/admin"
          className="hover:text-orange-400"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/formations"
          className="hover:text-orange-400"
        >
          Formations
        </Link>

        <Link
          to="/admin/projects"
          className="hover:text-orange-400"
        >
          Projets
        </Link>

        <Link
          to="/admin/users"
          className="hover:text-orange-400"
        >
          Utilisateurs
        </Link>

        <Link
          to="/admin/reports"
          className="hover:text-orange-400"
        >
          Rapports
        </Link>
      </nav>
    </div>
  );
}
