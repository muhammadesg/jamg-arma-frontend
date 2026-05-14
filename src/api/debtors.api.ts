import { api } from './api';
import type { AxiosRequestConfig } from 'axios';

export const debtorsApi = {
  list: (params?: Record<string, unknown>, config?: AxiosRequestConfig) =>
    api.get<unknown>('debtors', { params, ...config }),
  create: (data: Record<string, unknown>, config?: AxiosRequestConfig) =>
    api.post<unknown>('debtors', data, config),
  show: (id: string | number, config?: AxiosRequestConfig) =>
    api.get<unknown>(`debtors/${id}`, config),
  update: (id: string | number, data: Record<string, unknown>, config?: AxiosRequestConfig) =>
    api.put<unknown>(`debtors/${id}`, data, config),
  delete: (id: string | number, config?: AxiosRequestConfig) =>
    api.delete<unknown>(`debtors/${id}`, config),
};
