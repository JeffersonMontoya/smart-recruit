import apiClient from './apiClient';
import { User } from '../types/vacancy.types';

export const getStaff = async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data;
};

export const createRecruiter = async (nombre: string, email: string): Promise<User> => {
    const response = await apiClient.post('/users/recruiter', { nombre, email });
    return response.data;
};

export const deleteStaff = async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
};
