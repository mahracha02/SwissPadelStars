import axios from 'axios';

const API_URL = 'https://127.0.0.1:8000/api/admin';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = async (endpoint: string) => {
  const response = await api.get(endpoint);
  return response.data;
};

export const post = async (endpoint: string, data: any) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export const put = async (endpoint: string, data: any) => {
  const response = await api.put(endpoint, data);
  return response.data;
};

export const del = async (endpoint: string) => {
  const response = await api.delete(endpoint);
  return response.data;
};

export const patch = async (endpoint: string, data: any) => {
  const response = await api.patch(endpoint, data);
  return response.data;
};

export default api; 