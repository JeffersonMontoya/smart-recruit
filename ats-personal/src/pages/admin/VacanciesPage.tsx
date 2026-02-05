import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import { List, Plus } from "lucide-react";
import { useVacancies } from "../../hooks/useVacancies";
import { VacancyForm } from "../../components/vacancies/VacancyForm";
import { VacancyFilters } from "../../components/vacancies/VacancyFilters";
import { VacancyTable } from "../../components/vacancies/VacancyTable";
import { VacancyCard } from "../../components/vacancies/VacancyCard";
import { VacancyDetailModal } from "../../components/vacancies/VacancyDetailModal";
import { Vacancy } from "../../types/vacancy.types";

export const VacanciesPage = () => {
  const {
    viewMode,
    formData,
    handleInputChange,
    handleSubmit,
    handleResetForm,
    toggleView,
    vacancies,
    loading,
    isSubmitting,
  } = useVacancies();

  const [selectedVacancy, setSelectedVacancy] = React.useState<Vacancy | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);

  const handleViewDetails = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setIsDetailModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-110px)] flex flex-col pt-0 px-4 lg:px-6 overflow-hidden -mt-5 no-scrollbar">
        {/* HEADER DINÁMICO */}
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-1">
              {viewMode === "create"
                ? "ADMINISTRACIÓN DE TALENTO"
                : "PANEL DE SEGUIMIENTO"}
            </span>
            <h1 className="text-3xl font-black text-white italic uppercase leading-none tracking-tighter">
              {viewMode === "create" ? (
                <>
                  NUEVA <span className="text-zinc-800">VACANTE</span>
                </>
              ) : (
                <>
                  LISTADO <span className="text-zinc-800">VACANTES</span>
                </>
              )}
            </h1>
          </div>

          <button
            onClick={toggleView}
            className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 group"
          >
            {viewMode === "create" ? (
              <>
                <List size={14} className="group-hover:text-indigo-400" />
                Ver Vacantes
              </>
            ) : (
              <>
                <Plus size={14} className="group-hover:text-indigo-400" />
                Nueva Vacante
              </>
            )}
          </button>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="flex-1 bg-[#0c0c0e]/60 border border-zinc-800/50 rounded-[2rem] backdrop-blur-3xl relative flex flex-col overflow-hidden shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {viewMode === "create" ? (
            <VacancyForm
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onReset={handleResetForm}
              isSubmitting={isSubmitting}
            />
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
              <VacancyFilters />

              <div className="flex-1 overflow-auto no-scrollbar p-4 md:p-0 relative">
                {loading && (
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] animate-pulse">
                        Sincronizando...
                      </span>
                    </div>
                  </div>
                )}

                {/* VISTA MOBILE */}
                <div className="md:hidden space-y-4">
                  {vacancies.map((vacancy) => (
                    <VacancyCard
                      key={vacancy.id}
                      vacancy={vacancy}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                  {vacancies.length === 0 && !loading && (
                    <div className="p-10 text-center text-zinc-600 font-bold uppercase text-xs">
                      No hay vacantes disponibles
                    </div>
                  )}
                </div>

                {/* VISTA DESKTOP */}
                <VacancyTable
                  vacancies={vacancies}
                  onViewDetails={handleViewDetails}
                />
                {vacancies.length === 0 && !loading && (
                  <div className="hidden md:block p-10 text-center text-zinc-600 font-bold uppercase text-xs">
                    No hay vacantes disponibles
                  </div>
                )}
              </div>

              {/* Footer de la lista */}
              <div className="p-4 border-t border-zinc-900/50 bg-black/40 flex items-center justify-between">
                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest hidden sm:block">
                  Mostrando {vacancies.length} vacantes disponibles
                </span>
                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest sm:hidden">
                  {vacancies.length} Vacantes
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <button
                      key={i}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${i === 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-zinc-600 hover:bg-zinc-900"}`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <VacancyDetailModal
        vacancy={selectedVacancy}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </MainLayout>
  );
};
