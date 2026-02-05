import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { login as loginService, register as registerService } from "../services/auth.service";

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const { login: setAuthContext } = useAuth();

  const handleLogin = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginService(email, password);
      setAuthContext(data.token, {
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        rol: data.rol,
      });
      return data;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setAuthContext]);

  const handleRegister = useCallback(async (nombre: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await registerService(nombre, email, password);
      setAuthContext(data.token, {
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        rol: data.rol,
      });
      return data;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setAuthContext]);

  return {
    loading,
    handleLogin,
    handleRegister,
  };
};
