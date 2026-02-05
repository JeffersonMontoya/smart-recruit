import { MapPin, DollarSign, UserCheck, Eye, MoreVertical } from "lucide-react";
import { Vacancy } from "../../types/vacancy.types";
import { Card } from "../ui/Card";

interface VacancyCardProps {
  vacancy: Vacancy;
  onViewDetails: (vacancy: Vacancy) => void;
}

export const VacancyCard = ({ vacancy, onViewDetails }: VacancyCardProps) => {
  return (
    <Card className="bg-zinc-900/40 border-zinc-800/50 p-5 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
            {vacancy.nivel}
          </span>
          <h3 className="text-lg font-bold text-white leading-tight uppercase tracking-tighter italic">
            {vacancy.titulo}
          </h3>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
            vacancy.estado === "Activa"
              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              : "bg-zinc-800 text-zinc-500 border border-zinc-700/50"
          }`}
        >
          {vacancy.estado}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-tight">
          <MapPin size={12} className="text-zinc-700" /> {vacancy.ubicacion}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-tight">
          <DollarSign size={12} className="text-zinc-700" /> {vacancy.salario}
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between">
        <span className="text-[9px] text-zinc-600 font-bold uppercase italic">
          {vacancy.fecha}
        </span>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 p-2 rounded-lg text-white transition-all">
            <UserCheck size={16} />
          </button>
          <button
            onClick={() => onViewDetails(vacancy)}
            className="bg-indigo-500 text-white p-2 rounded-lg transition-all shadow-lg shadow-indigo-500/20"
          >
            <Eye size={16} />
          </button>
          <button className="bg-white/5 hover:bg-white/10 p-2 rounded-lg text-white transition-all">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
};
