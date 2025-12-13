import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import FormationsAdmin from "./pages/FormationsAdmin";
import ProjectsAdmin from "./pages/ProjectsAdmin";
import Users from "./pages/Users";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login admin */}
        <Route path="/admin/login" element={<Login />} />

        {/* Zone admin protégée */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="formations" element={<FormationsAdmin />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
