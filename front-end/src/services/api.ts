import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const API_URL = 'https://127.0.0.1:8000/api';

// Define types for request data
type RequestData = Record<string, unknown>;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
});

// Add request interceptor to include auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const get = async (endpoint: string) => {
  const response = await api.get(endpoint);
  return response.data;
};

export const post = async (endpoint: string, data: RequestData) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export const put = async (endpoint: string, data: RequestData) => {
  const response = await api.put(endpoint, data);
  return response.data;
};

export const del = async (endpoint: string) => {
  const response = await api.delete(endpoint);
  return response.data;
};

export const patch = async (endpoint: string, data: RequestData) => {
  const response = await api.patch(endpoint, data);
  return response.data;
};

export default api; 