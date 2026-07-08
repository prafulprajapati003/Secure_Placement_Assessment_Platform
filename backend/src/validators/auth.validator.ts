import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'student', 'moderator']).default('student'),
  profile: z.object({
    rollNumber: z.string().min(1, 'Roll number is required'),
    branch: z.string().min(1, 'Branch is required'),
    batch: z.string().min(1, 'Batch is required'),
    cgpa: z.coerce.number().min(0, 'CGPA cannot be negative').max(10, 'CGPA cannot exceed 10'),
    backlogs: z.coerce.number().min(0, 'Backlogs cannot be negative').default(0),
  }).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
