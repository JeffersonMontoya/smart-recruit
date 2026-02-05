export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'recruiter' | 'candidate';
  createdAt: string;
}

export interface Vacancy {
  id: number;
  titulo: string;
  ubicacion: string;
  salario: string;
  nivel: string;
  descripcion: string;
  estado: string;
  fecha: string;
}

export interface VacancyFormData {
  titulo: string;
  ubicacion: string;
  salario: string;
  nivel: string;
  descripcion: string;
}

export interface AuthResponse {
  token: string;
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'recruiter' | 'candidate';
}

export interface HealthResponse {
  status: string;
  message: string;
}
