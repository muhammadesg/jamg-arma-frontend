import { api } from './api';
import type { AxiosRequestConfig } from 'axios';

export const usersApi = {
  list: (params?: Record<string, unknown>, config?: AxiosRequestConfig) =>
    api.get<unknown>('users', { params, ...config }),
  create: (data: Record<string, unknown>, config?: AxiosRequestConfig) =>
    api.post<unknown>('users', data, config),
  show: (id: string | number, config?: AxiosRequestConfig) =>
    api.get<unknown>(`users/${id}`, config),
  update: (id: string | number, data: Record<string, unknown>, config?: AxiosRequestConfig) =>
    api.put<unknown>(`users/${id}`, data, config),
  delete: (id: string | number, config?: AxiosRequestConfig) =>
    api.delete<unknown>(`users/${id}`, config),
};
