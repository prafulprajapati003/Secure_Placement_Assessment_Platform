import React from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const getStrength = (pwd: string) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const percentage = (strength / 5) * 100;

  const getColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-green-400';
    return 'bg-green-500';
  };

  const getText = () => {
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength <= 3) return 'Good';
    if (strength <= 4) return 'Strong';
    return 'Very Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-white/60">Password strength</span>
        <span className={cn('text-xs font-medium', strength <= 2 ? 'text-red-400' : 'text-green-400')}>
          {getText()}
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={cn('h-full transition-all duration-300', getColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 space-y-1">
        <div className={cn('text-xs flex items-center gap-2', password.length >= 8 ? 'text-green-400' : 'text-white/40')}>
          <div className={cn('w-1.5 h-1.5 rounded-full', password.length >= 8 ? 'bg-green-400' : 'bg-white/40')} />
          At least 8 characters
        </div>
        <div className={cn('text-xs flex items-center gap-2', /[A-Z]/.test(password) ? 'text-green-400' : 'text-white/40')}>
          <div className={cn('w-1.5 h-1.5 rounded-full', /[A-Z]/.test(password) ? 'bg-green-400' : 'bg-white/40')} />
          Uppercase letter
        </div>
        <div className={cn('text-xs flex items-center gap-2', /[a-z]/.test(password) ? 'text-green-400' : 'text-white/40')}>
          <div className={cn('w-1.5 h-1.5 rounded-full', /[a-z]/.test(password) ? 'bg-green-400' : 'bg-white/40')} />
          Lowercase letter
        </div>
        <div className={cn('text-xs flex items-center gap-2', /[0-9]/.test(password) ? 'text-green-400' : 'text-white/40')}>
          <div className={cn('w-1.5 h-1.5 rounded-full', /[0-9]/.test(password) ? 'bg-green-400' : 'bg-white/40')} />
          Number
        </div>
        <div className={cn('text-xs flex items-center gap-2', /[^A-Za-z0-9]/.test(password) ? 'text-green-400' : 'text-white/40')}>
          <div className={cn('w-1.5 h-1.5 rounded-full', /[^A-Za-z0-9]/.test(password) ? 'bg-green-400' : 'bg-white/40')} />
          Special character
        </div>
      </div>
    </div>
  );
};
