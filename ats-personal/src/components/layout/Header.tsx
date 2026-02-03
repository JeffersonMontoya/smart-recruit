import React from "react";
import { Search, Bell, Calendar, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-black/50 backdrop-blur-md border-b border-zinc-900/50 h-20 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-cyan-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all text-sm"
              placeholder="Buscar candidatos, vacantes o reclutadores..."
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800">
          <Calendar className="w-5 h-5" />
        </button>
        <button className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-black"></span>
        </button>
        <div className="h-8 w-px bg-zinc-800 mx-2"></div>
        <button className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-full shadow-lg shadow-cyan-900/20 transition-all flex items-center gap-2">
          Download Report
        </button>
      </div>
    </header>
  );
};

export default Header;
