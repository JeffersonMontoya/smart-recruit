import apiClient from './apiClient';
import { Vacancy, VacancyFormData } from '../types/vacancy.types';

export const getJobs = async (): Promise<Vacancy[]> => {
    const response = await apiClient.get('/jobs');
    return response.data;
};

export const createJob = async (jobData: VacancyFormData): Promise<Vacancy> => {
    const response = await apiClient.post('/jobs', jobData);
    return response.data;
};


