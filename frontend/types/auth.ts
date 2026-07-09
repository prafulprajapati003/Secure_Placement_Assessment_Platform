export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
