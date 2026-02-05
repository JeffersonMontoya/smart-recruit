import apiClient from './apiClient';
import { AuthResponse } from '../types/vacancy.types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (nombre: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', { nombre, email, password });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};
