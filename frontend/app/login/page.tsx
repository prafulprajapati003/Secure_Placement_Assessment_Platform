'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { AuthCard } from '@/components/auth/AuthCard';
import { Logo } from '@/components/auth/Logo';
import { Input } from '@/components/auth/Input';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { Button } from '@/components/auth/Button';
import { BackgroundAnimation } from '@/components/auth/BackgroundAnimation';
import { SocialButtons } from '@/components/auth/SocialButtons';
import { Divider } from '@/components/auth/Divider';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      // Error is handled in useAuth hook
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BackgroundAnimation />
      <AuthCard>
        <div className="text-center mb-8">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-white/60">Sign in to your account to continue</p>
        </div>

        <SocialButtons />

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-white/60">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Sign up
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
