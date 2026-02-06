import React, { useState , useEffect } from "react";
import { VacancyFormData, Vacancy } from "../types/vacancy.types";
import { createJob , getJobs } from "../services/jobs.service";
import toast from "react-hot-toast";

export type ViewMode = "create" | "list";

export const useVacancies = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("create");
  const [formData, setFormData] = useState<VacancyFormData>({
    titulo: "",
    ubicacion: "",
    salario: "",
    nivel: "",
    descripcion: "",
  });
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchVacancies = async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      const data = await getJobs();
      setVacancies(data);
    } catch (error) {
      console.error("Error cargando vacantes:", error);
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  useEffect(() => {
    // Carga inicial con spinner
    fetchVacancies();
    
    // Polling agresivo y silencioso cada 10 segundos
    const interval = setInterval(() => {
      fetchVacancies(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetForm = () => {
    setFormData({
      titulo: "",
      ubicacion: "",
      salario: "",
      nivel: "",
      descripcion: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await createJob(formData);
      toast.success("Vacante publicada con éxito");
      handleResetForm();
      await fetchVacancies(true); // Actualizamos silenciosamente
      setViewMode("list");
    } catch (error) {
      toast.error("Error al publicar la vacante");
      console.error("Error al crear la vacante", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleView = () => {
    setViewMode((prev) => (prev === "create" ? "list" : "create"));
  };

  return {
    viewMode,
    formData,
    handleInputChange,
    handleSubmit,
    handleResetForm,
    toggleView,
    vacancies,
    loading,
    isSubmitting,
    fetchVacancies,
  };
};
