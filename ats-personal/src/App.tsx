import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import {
  ProtectedRoute,
  PublicRoute,
} from "./components/layout/ProtectedRoutes";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import MainLayout from "./components/layout/MainLayout";
import { ProfileCard } from "./components/dashboard/ProfileCard";
import { StatsGrid } from "./components/dashboard/StatsGrid";
import { StaffManagementPage } from "./pages/admin/StaffManagementPage";

// Componente Dashboard existente
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="animate-fade-in space-y-8">
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Dashboard General
              </h1>
              <p className="text-zinc-500">
                Bienvenido de vuelta {user?.nombre}, aquí está lo que sucede
                hoy.
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-600 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-900">
              v1.0.0-beta
            </span>
          </div>

          <ProfileCard />
          <StatsGrid />
        </section>
      </div>
    </MainLayout>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Rutas Públicas (Solo accesibles si NO estás logueado) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Rutas Privadas (Solo accesibles si SI estás logueado) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/staff" element={<StaffManagementPage />} />
            {/* Redirigir la raíz al dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Rutas desconocidas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
