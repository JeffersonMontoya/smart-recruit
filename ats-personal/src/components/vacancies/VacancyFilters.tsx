import { Search } from "lucide-react";

export const VacancyFilters = () => {
  return (
    <div className="p-4 lg:p-6 border-b border-zinc-900/50 flex flex-col md:flex-row gap-4 items-center justify-between bg-black/10">
      <div className="relative w-full md:w-96">
        <Search
          size={14}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
        />
        <input
          type="text"
          placeholder="Buscar vacante..."
          className="w-full bg-black/20 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-700 outline-none focus:border-indigo-500/30 transition-all"
        />
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <select className="flex-1 md:w-40 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-[10px] text-zinc-400 outline-none">
          <option>Todos los estados</option>
          <option>Activas</option>
          <option>Cerradas</option>
        </select>
      </div>
    </div>
  );
};
