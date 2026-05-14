import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { debtorsApi } from '../../api/debtors.api';
import { message } from 'antd';

export const useDebtors = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['debtors', params],
    queryFn: () => debtorsApi.list(params),
  });
};

export const useDebtor = (id?: number | string, enabled = true) => {
  return useQuery({
    queryKey: ['debtors', id],
    queryFn: () => debtorsApi.show(id as number | string),
    enabled: enabled && Boolean(id),
  });
};

export const useCreateDebtor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: debtorsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debtors'] });
      message.success('Debtor created');
    },
  });
};

export const useUpdateDebtor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Record<string, unknown> }) => debtorsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debtors'] });
      message.success('Debtor updated');
    },
  });
};

export const useDeleteDebtor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => debtorsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debtors'] });
      message.success('Debtor deleted');
    },
  });
};
