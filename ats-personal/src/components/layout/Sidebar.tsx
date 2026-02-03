import React from "react";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  FileCheck,
  Settings,
  HelpCircle,
  Briefcase,
  LogOut,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { NavItem } from "../ui/NavItem";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { logout, user } = useAuth();

  // Simplificamos la validación de roles
  const isAdmin = user?.rol === "admin";
  const isRecruiter = user?.rol === "recruiter";
  const isCandidate = user?.rol === "candidate";

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-zinc-950 border-r border-zinc-900 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Área del Logo */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              SmartRecruit
            </span>
          </div>
        </div>

        {/* Navegación Principal */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8 no-scrollbar">
          {/* SECCIÓN 1: MENÚ PRINCIPAL (Dinámico por Rol) */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-3">
              Menú Principal
            </h3>
            <nav className="space-y-1">
              <NavItem
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                to="/dashboard"
              />

              {/* Vistas para Reclutadores y Admins */}
              {(isAdmin || isRecruiter) && (
                <>
                  <NavItem
                    icon={<Users size={20} />}
                    label="Candidatos"
                    to="/candidates"
                  />
                  <NavItem
                    icon={<Briefcase size={20} />}
                    label="Vacantes"
                    to="/vacancies"
                  />
                  <NavItem
                    icon={<Calendar size={20} />}
                    label="Entrevistas"
                    to="/interviews"
                  />
                  <NavItem
                    icon={<BarChart2 size={20} />}
                    label="Métricas"
                    to="/metrics"
                  />
                </>
              )}

              {/* Vistas exclusivas para Candidatos */}
              {isCandidate && (
                <>
                  <NavItem
                    icon={<Briefcase size={20} />}
                    label="Explorar Empleos"
                    to="/explore"
                  />
                  <NavItem
                    icon={<FileCheck size={20} />}
                    label="Mis Postulaciones"
                    to="/my-applications"
                  />
                  <NavItem
                    icon={<Calendar size={20} />}
                    label="Mis Citas"
                    to="/my-appointments"
                  />
                </>
              )}
            </nav>
          </div>

          {/* SECCIÓN 2: ADMINISTRACIÓN (Solo Admins) */}
          {isAdmin && (
            <div>
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-3">
                Panel de Control
              </h3>
              <nav className="space-y-1">
                <NavItem
                  icon={<ShieldCheck size={20} />}
                  label="Gestionar Staff"
                  to="/staff"
                />
                <NavItem
                  icon={<Settings size={20} />}
                  label="Configuración Sistema"
                  to="/settings"
                />
              </nav>
            </div>
          )}

          {/* SECCIÓN 3: SOPORTE Y AJUSTES (Para todos) */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-3">
              Usuario
            </h3>
            <nav className="space-y-1">
              <NavItem
                icon={<Settings size={20} />}
                label="Mi Perfil"
                to="/profile"
              />
              <NavItem
                icon={<HelpCircle size={20} />}
                label="Ayuda"
                to="/help"
              />
            </nav>
          </div>
        </div>

        {/* Footer con Cierre de Sesión */}
        <div className="p-6 border-t border-zinc-900">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 w-full text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 group"
          >
            <LogOut
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-medium text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
