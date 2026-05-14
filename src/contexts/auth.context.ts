import { createContext } from 'react';
import type { User } from '../features/auth/auth.types';

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  saveAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
