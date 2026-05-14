export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions?: string[];
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}
