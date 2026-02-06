import {
  MapPin,
  DollarSign,
  UserCheck,
  ArrowUpRight,
  MoreVertical,
  Clock,
} from "lucide-react";
import { Vacancy } from "../../types/vacancy.types";

interface VacancyTableProps {
  vacancies: Vacancy[];
  onViewDetails: (vacancy: Vacancy) => void;
}

export const VacancyTable = ({
  vacancies,
  onViewDetails,
}: VacancyTableProps) => {
  return (
    <table className="hidden md:table w-full text-left border-separate border-spacing-0">
      <thead className="sticky top-0 bg-[#0c0c0e] z-10">
        <tr>
          <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900/50 text-center">
            Nivel
          </th>
          <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900/50">
            Cargo
          </th>
          <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900/50 hidden md:table-cell">
            Ubicación
          </th>
          <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900/50 hidden lg:table-cell">
            Salario
          </th>
          <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900/50 text-center">
            Estado
          </th>
          <th className="px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900/50 text-right">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-900/30">
        {vacancies.map((vacancy) => (
          <tr
            key={vacancy.id}
            className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <td className="px-6 py-5 text-center">
              <span className="text-[10px] font-black text-indigo-500/60 uppercase tracking-widest">
                {vacancy.nivel}
              </span>
            </td>
            <td className="px-6 py-5">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight italic">
                  {vacancy.titulo}
                </span>
                <span className="text-[10px] text-zinc-600 flex items-center gap-1 font-bold">
                  <Clock size={10} /> {vacancy.fecha}
                </span>
              </div>
            </td>
            <td className="px-6 py-5 hidden md:table-cell">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-bold uppercase tracking-tight">
                <MapPin size={12} className="text-indigo-500/50" />
                {vacancy.ubicacion}
              </div>
            </td>
            <td className="px-6 py-5 hidden lg:table-cell">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono font-bold tracking-tighter">
                <DollarSign size={12} className="text-emerald-500/50" />
                {vacancy.salario}
              </div>
            </td>
            <td className="px-6 py-5 text-center">
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                  vacancy.estado === "Activa" || vacancy.estado === "open"
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-zinc-800 text-zinc-500 border border-zinc-700/50"
                }`}
              >
                {vacancy.estado}
              </span>
            </td>
            <td className="px-6 py-5 text-right">
              <div className="flex items-center justify-end gap-2">
                <button
                  className="p-2 hover:bg-white/5 rounded-lg text-zinc-600 hover:text-white transition-all"
                  title="Ver Aplicantes"
                >
                  <UserCheck size={16} />
                </button>
                <button
                  onClick={() => onViewDetails(vacancy)}
                  className="p-2 hover:bg-white/5 rounded-lg text-zinc-600 hover:text-indigo-400 transition-all group"
                  title="Ver y Postularme"
                >
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-600 hover:text-white transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
