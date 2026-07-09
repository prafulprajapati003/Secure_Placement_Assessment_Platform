import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative w-full max-w-md p-8 rounded-2xl',
        'bg-white/5 backdrop-blur-xl border border-white/10',
        'shadow-2xl shadow-black/50',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
