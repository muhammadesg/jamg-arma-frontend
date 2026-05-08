import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authApi } from './auth.api';
import { useAuth } from '../../contexts/AuthContext';
import type { LoginRequest } from './auth.types';

export function useLogin() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: ({ token, user }) => {
      saveAuth(token, user);
      message.success(`Xush kelibsiz, ${user.name}!`);
      navigate('/');
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      const msg = error.response?.data?.message ?? error.message ?? 'Login failed';
      message.error(msg);
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      navigate('/login');
    },
  });
}
