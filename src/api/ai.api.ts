import { api } from './api';
import type { AxiosRequestConfig } from 'axios';

export const aiApi = {
  recommendations: (config?: AxiosRequestConfig) => api.get<unknown>('ai/recommendations', config),
  analyze: (prompt: string, contextData?: any, config?: AxiosRequestConfig) => api.post<unknown>('ai/analyze', { prompt, contextData }, config),
};
