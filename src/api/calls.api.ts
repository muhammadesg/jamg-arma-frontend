import { api } from './api';
import type { AxiosRequestConfig } from 'axios';

export const callsApi = {
  queue: (config?: AxiosRequestConfig) => api.get<any>('queue', config),
  addToQueue: (debtor_id: number, config?: AxiosRequestConfig) =>
    api.post<any>('queue', { debtor_id }, config),
  startCall: (data: { debtor_id: number; queue_entry_id?: number }, config?: AxiosRequestConfig) =>
    api.post<any>('calls/start', data, config),
  endCall: (id: number, data: { result: string; category?: string; notes?: string }, config?: AxiosRequestConfig) =>
    api.patch<any>(`calls/${id}/end`, data, config),
  sessions: (config?: AxiosRequestConfig) => api.get<any>('calls/sessions', config),
  
  // Call result buttons
  getButtons: (config?: AxiosRequestConfig) => api.get<any>('call-result-buttons', config),
  createButton: (data: any, config?: AxiosRequestConfig) => api.post<any>('call-result-buttons', data, config),
  updateButton: (id: number | string, data: any, config?: AxiosRequestConfig) => api.put<any>(`call-result-buttons/${id}`, data, config),
  deleteButton: (id: number | string, config?: AxiosRequestConfig) => api.delete<any>(`call-result-buttons/${id}`, config),
};
