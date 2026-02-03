import React from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  Users, 
  FileCheck, 
  Settings, 
  HelpCircle,
  Briefcase,
  LogOut
} from 'lucide-react';
import { NavItem } from '../ui/NavItem';
import { useAuth } from '../../context/AuthContext';


const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-zinc-950 border-r border-zinc-900 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full">
      {/* Logo Area */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SmartRecruit</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
        {/* Main Menu Section */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-3">Main Menu</h3>
          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard"  active />
            <NavItem icon={<BarChart2 size={20} />} label="Analytics"  />
            <NavItem icon={<Users size={20} />} label="Candidatos" />
            <NavItem icon={<Briefcase size={20} />} label="Vacantes" />
            <NavItem icon={<FileCheck size={20} />} label="Aprobaciones" />
          </nav>
        </div>

        {/* Settings Section */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-3">Settings</h3>
          <nav className="space-y-1">
            <NavItem icon={<Settings size={20} />} label="Configuración" />
            <NavItem icon={<HelpCircle size={20} />} label="Ayuda & Soporte" />
          </nav>
        </div>
      </div>

  
      {/* User Footer */}
      <div className="p-6 border-t border-zinc-900">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 group"
        >
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
