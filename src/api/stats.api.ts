import { api } from './api';
import type { AxiosRequestConfig } from 'axios';

export const statsApi = {
  today: (config?: AxiosRequestConfig) => api.get<unknown>('stats/today', config),
  operator: (config?: AxiosRequestConfig) => api.get<unknown>('stats/operator', config),
  monthly: (config?: AxiosRequestConfig) => api.get<unknown>('stats/monthly', config),
  all: (config?: AxiosRequestConfig) => api.get<unknown>('stats/all', config),
  reports: (config?: AxiosRequestConfig) => api.get<unknown>('stats/reports', config),
};
