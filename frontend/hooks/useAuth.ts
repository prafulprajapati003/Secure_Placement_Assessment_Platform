'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { saveToken, getToken, removeToken } from '@/lib/token';
import type { User, LoginRequest, RegisterRequest } from '@/types/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Failed to parse user data:', error);
          removeToken();
          localStorage.removeItem('user_data');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      saveToken(response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      setUser(response.user);
      toast.success('Login successful!');
      
      if (response.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  }, [router]);

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data);
      saveToken(response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      setUser(response.user);
      toast.success('Registration successful!');
      
      if (response.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  }, [router]);

  const logout = useCallback(() => {
    removeToken();
    localStorage.removeItem('user_data');
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/login');
  }, [router]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
