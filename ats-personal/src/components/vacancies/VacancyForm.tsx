import React from "react";
import {
  Type,
  MapPin,
  DollarSign,
  UserCheck,
  ChevronRight,
  Zap,
  Loader2,
} from "lucide-react";
import { VacancyFormData } from "../../types/vacancy.types";

interface VacancyFormProps {
  formData: VacancyFormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  isSubmitting?: boolean;
}

export const VacancyForm = ({
  formData,
  onChange,
  onSubmit,
  onReset,
  isSubmitting = false,
}: VacancyFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex-1 flex flex-col p-5 lg:p-7 justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="group space-y-1">
          <label className="flex items-center gap-2 text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">
            <Type size={12} /> Título del Cargo
          </label>
          <input
            name="titulo"
            value={formData.titulo}
            onChange={onChange}
            disabled={isSubmitting}
            type="text"
            className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-800 outline-none focus:border-indigo-500/50 transition-all disabled:opacity-50"
            placeholder="p. ej. Fullstack Developer"
            required
          />
        </div>

        <div className="group space-y-1">
          <label className="flex items-center gap-2 text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">
            <MapPin size={12} /> Ubicación
          </label>
          <input
            name="ubicacion"
            type="text"
            value={formData.ubicacion}
            onChange={onChange}
            disabled={isSubmitting}
            className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-800 outline-none focus:border-indigo-500/50 transition-all disabled:opacity-50"
            placeholder="Remoto / Bogotá, CO"
            required
          />
        </div>

        <div className="group space-y-1">
          <label className="flex items-center gap-2 text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">
            <DollarSign size={12} /> Rango Salarial
          </label>
          <input
            name="salario"
            type="text"
            value={formData.salario ?? ""}
            onChange={onChange}
            disabled={isSubmitting}
            className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-800 outline-none focus:border-indigo-500/50 transition-all disabled:opacity-50"
            placeholder="4,000 - 6,500 USD"
          />
        </div>

        <div className="group space-y-1">
          <label className="flex items-center gap-2 text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">
            <UserCheck size={12} /> Nivel de Experiencia
          </label>
          <div className="relative">
            <select
              name="nivel"
              value={formData.nivel}
              onChange={onChange}
              disabled={isSubmitting}
              className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-500 outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer disabled:opacity-50"
              required
            >
              <option value="">Selecciona nivel</option>
              <option value="junior">Junior Level</option>
              <option value="mid">Mid-Senior Level</option>
              <option value="senior">Senior Level</option>
            </select>
            <ChevronRight
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-zinc-700 pointer-events-none"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col group space-y-1 flex-1 overflow-hidden">
          <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">
            Descripción de la Vacante
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={onChange}
            disabled={isSubmitting}
            className="flex-1 w-full min-h-[100px] bg-black/40 border border-zinc-800 rounded-[1.5rem] px-5 py-4 text-sm text-white placeholder:text-zinc-800 outline-none focus:border-indigo-500/50 transition-all resize-none leading-relaxed disabled:opacity-50"
            placeholder="Detalla las responsabilidades y beneficios..."
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50 mt-4">
        <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-[0.3em]">
          SmartRecruit v1.2 | Standalone UI
        </span>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onReset}
            disabled={isSubmitting}
            className="text-zinc-600 hover:text-white font-black uppercase text-[9px] tracking-widest transition-colors disabled:opacity-30"
          >
            Limpiar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-white text-black px-10 py-3 rounded-xl font-black uppercase text-[10px] tracking-tighter hover:bg-zinc-200 transition-all shadow-xl active:scale-95 group disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Zap
                size={12}
                className="fill-black group-hover:scale-110 transition-transform"
              />
            )}
            {isSubmitting ? "Publicando..." : "Publicar Vacante"}
          </button>
        </div>
      </div>
    </form>
  );
};
