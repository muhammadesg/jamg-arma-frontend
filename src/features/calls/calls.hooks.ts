import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { callsApi } from '../../api/calls.api';
import { message } from 'antd';

export const useCallQueue = () => {
  return useQuery({
    queryKey: ['callQueue'],
    queryFn: callsApi.queue,
  });
};

export const useAddToQueue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: callsApi.addToQueue,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ['callQueue'] });
      message.success(response.message || 'Navbatga qo\'shildi');
    },
  });
};

export const useStartCall = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (debtor: { id: number | string; queue_entry_id?: number | string }) =>
      callsApi.startCall({
        debtor_id: Number(debtor.id),
        ...(debtor.queue_entry_id ? { queue_entry_id: Number(debtor.queue_entry_id) } : {}),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callQueue'] });
      message.success('Call started');
    },
  });
};

export const useEndCall = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, result, category, notes }: { id: number | string; result: string; category?: string; notes?: string }) =>
      callsApi.endCall(Number(id), { result, category, notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callQueue'] });
      queryClient.invalidateQueries({ queryKey: ['callSessions'] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'operator'] });
      message.success('Call recorded');
    },
  });
};

export const useCallSessions = () => {
  return useQuery({
    queryKey: ['callSessions'],
    queryFn: callsApi.sessions,
  });
};

// Call result buttons
export const useCallResultButtons = () => {
  return useQuery({
    queryKey: ['callResultButtons'],
    queryFn: async () => {
        const response = await callsApi.getButtons();
        return Array.isArray(response.data) ? response.data : response;
    },
  });
};

export const useCreateCallResultButton = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => callsApi.createButton(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callResultButtons'] });
      message.success('Button created');
    },
  });
};

export const useUpdateCallResultButton = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) => callsApi.updateButton(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callResultButtons'] });
      message.success('Button updated');
    },
  });
};

export const useDeleteCallResultButton = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => callsApi.deleteButton(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callResultButtons'] });
      message.success('Button deleted');
    },
  });
};
