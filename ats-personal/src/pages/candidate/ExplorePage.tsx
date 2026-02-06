import React, { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { Search, Loader2 } from "lucide-react";
import { VacancyFilters } from "../../components/vacancies/VacancyFilters";
import { VacancyTable } from "../../components/vacancies/VacancyTable";
import { VacancyCard } from "../../components/vacancies/VacancyCard";
import { VacancyDetailModal } from "../../components/vacancies/VacancyDetailModal";
import { Vacancy } from "../../types/vacancy.types";
import { useVacancies } from "../../hooks/useVacancies";

export const ExplorePage = () => {
  const { vacancies, loading } = useVacancies();
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetails = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setIsDetailModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-110px)] flex flex-col pt-0 px-4 lg:px-6 overflow-hidden -mt-5 no-scrollbar">
        {/* HEADER ELEGANTE */}
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-1">
              OPORTUNIDADES DISPONIBLES
            </span>
            <h1 className="text-3xl font-black text-white italic uppercase leading-none tracking-tighter">
              EXPLORAR <span className="text-zinc-800">EMPLEOS</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-zinc-900/30 border border-zinc-800/50 px-4 py-2 rounded-xl">
            <Search size={14} className="text-zinc-500" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
              Encuentra tu próximo reto
            </span>
          </div>
        </div>

        {/* CONTENEDOR PRINCIPAL ESTILO PREMIUM */}
        <div className="flex-1 bg-[#0c0c0e]/60 border border-zinc-800/50 rounded-[2rem] backdrop-blur-3xl relative flex flex-col overflow-hidden shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
            <VacancyFilters />

            <div className="flex-1 overflow-auto no-scrollbar p-0 relative">
              {loading && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] animate-pulse">
                      Sincronizando.....
                    </span>
                  </div>
                </div>
              )}

              {/* VISTA MOBILE: CARTAS */}
              <div className="md:hidden space-y-4 p-4">
                {vacancies.map((vacancy) => (
                  <VacancyCard
                    key={vacancy.id}
                    vacancy={vacancy}
                    onViewDetails={handleViewDetails}
                  />
                ))}
                {!loading && vacancies.length === 0 && (
                  <div className="p-10 text-center text-zinc-600 font-bold uppercase text-xs">
                    No hay vacantes disponibles
                  </div>
                )}
              </div>

              {/* VISTA DESKTOP: TABLA (Igual que Admin) */}
              <div className="hidden md:block">
                <VacancyTable
                  vacancies={vacancies}
                  onViewDetails={handleViewDetails}
                />
                {!loading && vacancies.length === 0 && (
                  <div className="p-20 text-center text-zinc-600 font-bold uppercase text-xs">
                    No hay vacantes disponibles actualmente
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER DE LA LISTA */}
            <div className="p-4 border-t border-zinc-900/50 bg-black/40 flex items-center justify-between">
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] hidden sm:block">
                Mostrando {vacancies.length} oportunidades para tu carrera
              </span>
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] sm:hidden">
                {vacancies.length} Vacantes
              </span>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                  1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE DETALLES Y POSTULACIÓN */}
      <VacancyDetailModal
        vacancy={selectedVacancy}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </MainLayout>
  );
};
