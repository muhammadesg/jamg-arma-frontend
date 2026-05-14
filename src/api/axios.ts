import axios, { AxiosError } from 'axios';
import { message } from 'antd';

const TOKEN_KEY = 'auth_token';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY);

const rawBaseURL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api/';
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL : `${rawBaseURL}/`;

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; detail?: string }>) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    const serverMessage =
      error.response?.data?.message ??
      error.response?.data?.detail ??
      error.message ??
      'Something went wrong';

    message.error(serverMessage);
    return Promise.reject(error);
  },
);

export default axiosInstance;
