import React from 'react';
import { Github, Chrome } from 'lucide-react';
import { Button } from './Button';

export const SocialButtons: React.FC = () => {
  return (
    <div className="space-y-3">
      <Button
        variant="secondary"
        className="w-full"
        type="button"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        type="button"
      >
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  );
};
