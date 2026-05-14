import { useQuery } from '@tanstack/react-query';
import { statsApi } from '../../api/stats.api';

export const useTodayStats = () => {
  return useQuery({
    queryKey: ['stats', 'today'],
    queryFn: statsApi.today,
    staleTime: Infinity,
  });
};

export const useOperatorStats = () => {
  return useQuery({
    queryKey: ['stats', 'operator'],
    queryFn: statsApi.operator,
    staleTime: Infinity,
  });
};

export const useMonthlyStats = (enabled = true) => {
  return useQuery({
    queryKey: ['stats', 'monthly'],
    queryFn: statsApi.monthly,
    staleTime: Infinity,
    enabled,
  });
};

export const useAllOperatorsStats = (enabled = true) => {
  return useQuery({
    queryKey: ['stats', 'all'],
    queryFn: statsApi.all,
    staleTime: Infinity,
    enabled,
  });
};

export const useReportsStats = (enabled = true) => {
  return useQuery({
    queryKey: ['stats', 'reports'],
    queryFn: statsApi.reports,
    staleTime: Infinity,
    enabled,
  });
};
