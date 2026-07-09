import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ className, label, error, id, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-white/80 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};
