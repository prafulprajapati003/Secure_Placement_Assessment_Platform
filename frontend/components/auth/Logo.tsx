import React from 'react';
import { Shield } from 'lucide-react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Shield className="h-8 w-8 text-blue-500" />
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          SecureAssess
        </span>
      </div>
    </div>
  );
};
