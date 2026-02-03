import { useState, useEffect, useCallback } from "react";
import { getStaff, createRecruiter, deleteStaff } from "../services/api";

export interface StaffMember {
  id: string;
  nombre: string;
  email: string;
  rol: "admin" | "recruiter" | "candidate";
  createdAt: string;
}

export interface UseStaffReturn {
  staff: StaffMember[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
  fetchStaff: () => Promise<void>;
  inviteRecruiter: (nombre: string, email: string) => Promise<StaffMember>;
  removeMember: (id: string) => Promise<void>;
}

export const useStaff = (): UseStaffReturn => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStaff();
      setStaff(data);
    } catch (err: any) {
      const message = err.response?.data?.message || "Error al cargar la lista de staff";
      setError(message);
      throw err; // Re-lanzamos para que la UI pueda manejarlo si quiere
    } finally {
      setLoading(false);
    }
  }, []);

  const inviteRecruiter = useCallback(async (nombre: string, email: string): Promise<StaffMember> => {
    setSubmitting(true);
    setError(null);
    try {
      const newMember = await createRecruiter(nombre, email);
      // Actualizamos el estado local de forma optimista o refrescamos la lista
      await fetchStaff();
      return newMember;
    } catch (err: any) {
      const message = err.response?.data?.message || "Error al invitar al reclutador";
      setError(message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, [fetchStaff]);

  const removeMember = useCallback(async (id: string): Promise<void> => {
    setError(null);
    try {
      await deleteStaff(id);
      // Filtramos localmente para una respuesta instantánea en la UI
      setStaff((prev) => prev.filter((member) => member.id !== id));
    } catch (err: any) {
      const message = err.response?.data?.message || "Error al eliminar el miembro";
      setError(message);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchStaff().catch(() => {}); // El error ya se maneja en el estado
  }, [fetchStaff]);

  return {
    staff,
    loading,
    error,
    submitting,
    fetchStaff,
    inviteRecruiter,
    removeMember,
  };
};
