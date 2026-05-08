import { api } from '../../api/api';
import type { LoginRequest, LoginResponse, LogoutResponse, User } from './auth.types';

// Toggle this to switch between mock and real API
const isMock = true;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_USER: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Aziz Xasanov',
  role: 'Administrator',
};

const MOCK_TOKEN = 'mock_token_xyz_123';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    if (isMock) {
      await delay(800);
      if (data.email === 'admin@example.com' && data.password === 'admin123') {
        return { token: MOCK_TOKEN, user: MOCK_USER };
      }
      throw Object.assign(new Error("Email yoki parol noto'g'ri"), {
        response: { data: { message: "Email yoki parol noto'g'ri" }, status: 400 },
      });
    }
    return api.post<LoginResponse>('auth/login', data);
  },

  logout: async (): Promise<LogoutResponse> => {
    if (isMock) {
      await delay(300);
      return { message: 'Logged out successfully' };
    }
    return api.post<LogoutResponse>('auth/logout');
  },
};
