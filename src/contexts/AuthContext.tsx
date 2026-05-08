import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { getToken, setToken, removeToken } from '../api/axios';
import type { User } from '../features/auth/auth.types';

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  saveAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_KEY = 'auth_user';

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);

  const saveAuth = useCallback((token: string, u: User) => {
    setToken(token);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const clearAuth = useCallback(() => {
    removeToken();
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!getToken(), user, saveAuth, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
