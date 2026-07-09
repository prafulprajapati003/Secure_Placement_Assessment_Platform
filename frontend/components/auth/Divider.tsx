import React from 'react';

export const Divider: React.FC = () => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-transparent text-white/50">or continue with</span>
      </div>
    </div>
  );
};
