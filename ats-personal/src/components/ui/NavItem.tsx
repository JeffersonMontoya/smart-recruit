import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  onClick?: () => void;
}

export const NavItem = ({ icon, label, to = "#", onClick }: NavItemProps) => {
  const location = useLocation();
  const active = to !== "#" && location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
        ${
          active
            ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 font-medium shadow-sm shadow-cyan-900/10 border border-cyan-500/10"
            : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"
        }
      `}
    >
      <span
        className={`
        transition-colors duration-200
        ${active ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"}
      `}
      >
        {icon}
      </span>
      <span>{label}</span>

      {active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] animate-pulse" />
      )}
    </Link>
  );
};
