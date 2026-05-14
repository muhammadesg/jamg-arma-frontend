import { api } from '../../api/api';
import type { LoginRequest, LoginResponse, LogoutResponse, User } from './auth.types';



export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    // Backend expects 'username' instead of 'email'
    const payload = {
      username: data.email,
      password: data.password,
    };
    
    const response = await api.post<{ data: { access: string; user: User } }>('auth/login', payload);
    
    return {
      token: response.data.access,
      user: response.data.user,
    };
  },

  logout: async (): Promise<LogoutResponse> => {
    return api.post<LogoutResponse>('auth/logout');
  },
};
