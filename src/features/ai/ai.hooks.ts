import { useQuery, useMutation } from '@tanstack/react-query';
import { aiApi } from '../../api/ai.api';

export const useAiRecommendations = () => {
  return useQuery({
    queryKey: ['ai', 'recommendations'],
    queryFn: aiApi.recommendations,
    staleTime: Infinity,
  });
};

export const useAiAnalyze = () => {
  return useMutation({
    mutationFn: ({ prompt, contextData }: { prompt: string, contextData?: any }) => aiApi.analyze(prompt, contextData),
  });
};
