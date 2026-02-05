import { X, MapPin, DollarSign, Clock, Briefcase } from "lucide-react";
import { Vacancy } from "../../types/vacancy.types";

interface VacancyDetailModalProps {
  vacancy: Vacancy | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VacancyDetailModal = ({
  vacancy,
  isOpen,
  onClose,
}: VacancyDetailModalProps) => {
  if (!isOpen || !vacancy) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-none">
      <div
        className="absolute inset-0 bg-black/5 pointer-events-auto"
        onClick={onClose}
      />

      <div className="relative translate-x-8 translate-y-6 w-full max-w-2xl bg-[#0c0c0e] border border-zinc-800 rounded-[2.2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden animate-in zoom-in-95 duration-300 pointer-events-auto">
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-8 p-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white transition-all z-10"
        >
          <X size={18} />
        </button>

        <div className="px-10 py-6lg:px-10 lg:py-7">
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-0.5 bg-indigo-500/20 text-indigo-400 text-[8px] font-black uppercase tracking-widest rounded-full border border-indigo-500/30">
                {vacancy.nivel}
              </span>
              <span
                className={`px-3 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full border ${
                  vacancy.estado === "Activa"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-zinc-800 text-zinc-500 border-zinc-700/50"
                }`}
              >
                {vacancy.estado}
              </span>
            </div>

            <h2 className="text-2xl font-black text-white italic uppercase leading-none tracking-tighter">
              {vacancy.titulo}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-zinc-900/50">
            <div className="space-y-1">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                Ubicación
              </span>
              <div className="flex items-center gap-2 text-[11px] text-zinc-200 font-bold uppercase italic">
                <MapPin size={14} className="text-indigo-500" />
                {vacancy.ubicacion}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                Compensación
              </span>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono font-bold">
                <DollarSign size={14} className="text-emerald-500" />
                {vacancy.salario}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                Publicado
              </span>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-bold uppercase">
                <Clock size={14} className="text-zinc-700" />
                {vacancy.fecha}
              </div>
            </div>
          </div>

          <div className="space-y-3 max-h-[18vh] overflow-y-auto no-scrollbar pr-2">
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 border-l-2 border-indigo-500 pl-3">
              Descripción
            </h3>
            <div className="text-zinc-400 text-[12px] leading-relaxed whitespace-pre-wrap font-medium pl-3 border-l border-zinc-900/50">
              {vacancy.descripcion || "Detalles no disponibles."}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-900/50 flex items-center justify-between">
            <span className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">
              ID:{" "}
              <span className="text-zinc-400 font-mono italic">
                {vacancy.id.toString().slice(0, 8)}
              </span>
            </span>
            <div className="flex items-center gap-6">
              <button
                onClick={onClose}
                className="text-[9px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                Cerrar
              </button>
              <button className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-tighter hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95">
                Postularme Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
