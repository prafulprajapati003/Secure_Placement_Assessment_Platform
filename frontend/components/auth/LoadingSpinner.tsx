import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className 
}) => {
  return (
    <Loader2 
      style={{ width: size, height: size }}
      className={`animate-spin text-blue-500 ${className}`}
    />
  );
};
