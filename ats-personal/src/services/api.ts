import axios from 'axios';

// Configuración base de Axios (importante para que sepa dónde está el backend)
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Ajusta si tu backend corre en otro puerto
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar el token automáticamente a todas las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (nombre: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { nombre, email, password });
    return response.data;
};

export const verificarSaludBackend = async () => {
    try {
        const respuesta = await api.get('/health');
        return respuesta.data;
    } catch (error: any) {
        console.error('❌ Fallo en la sincronización inicial:', error.message);
        return { error: 'Backend no disponible' };
    }
};

export default api;