'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/lib/validations';
import { AuthCard } from '@/components/auth/AuthCard';
import { Logo } from '@/components/auth/Logo';
import { Input } from '@/components/auth/Input';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { Button } from '@/components/auth/Button';
import { BackgroundAnimation } from '@/components/auth/BackgroundAnimation';
import { SocialButtons } from '@/components/auth/SocialButtons';
import { Divider } from '@/components/auth/Divider';
import { PasswordStrength } from '@/components/auth/PasswordStrength';

export default function RegisterPage() {
  const { register: registerUser, isAuthenticated } = useAuth();
  const [password, setPassword] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchedPassword = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
    } catch (error) {
      // Error is handled in useAuth hook
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8">
      <BackgroundAnimation />
      <AuthCard className="max-w-lg">
        <div className="text-center mb-8">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
          <p className="text-white/60">Sign up to get started with SecureAssess</p>
        </div>

        <SocialButtons />

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <div>
            <PasswordInput
              id="password"
              label="Password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', {
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            <PasswordStrength password={watchedPassword} />
          </div>

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Role</label>
            <select
              id="role"
              className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              {...register('role')}
            >
              <option value="" className="bg-slate-900">Select your role</option>
              <option value="student" className="bg-slate-900">Student</option>
              <option value="admin" className="bg-slate-900">Admin</option>
            </select>
            {errors.role && (
              <p className="mt-1.5 text-sm text-red-400">{errors.role.message}</p>
            )}
          </div>

          <label className="flex items-start gap-3 text-sm text-white/70 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              {...register('acceptTerms')}
            />
            <span>
              I agree to the{' '}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-sm text-red-400">{errors.acceptTerms.message}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
          >
            Create account
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-white/60">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
