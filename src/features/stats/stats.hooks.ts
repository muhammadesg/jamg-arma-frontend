import { useQuery } from '@tanstack/react-query';
import { statsApi } from '../../api/stats.api';

export const useTodayStats = () => {
  return useQuery({
    queryKey: ['stats', 'today'],
    queryFn: statsApi.today,
    refetchInterval: 5000,
  });
};

export const useOperatorStats = () => {
  return useQuery({
    queryKey: ['stats', 'operator'],
    queryFn: statsApi.operator,
    refetchInterval: 5000,
  });
};

export const useMonthlyStats = (enabled = true) => {
  return useQuery({
    queryKey: ['stats', 'monthly'],
    queryFn: statsApi.monthly,
    refetchInterval: 5000,
    enabled,
  });
};

export const useAllOperatorsStats = (enabled = true) => {
  return useQuery({
    queryKey: ['stats', 'all'],
    queryFn: statsApi.all,
    refetchInterval: 5000,
    enabled,
  });
};

export const useReportsStats = (enabled = true) => {
  return useQuery({
    queryKey: ['stats', 'reports'],
    queryFn: statsApi.reports,
    refetchInterval: 10000,
    enabled,
  });
};
