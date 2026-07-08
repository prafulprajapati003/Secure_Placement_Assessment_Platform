"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    role: zod_1.z.enum(['admin', 'student', 'moderator']).default('student'),
    profile: zod_1.z.object({
        rollNumber: zod_1.z.string().min(1, 'Roll number is required'),
        branch: zod_1.z.string().min(1, 'Branch is required'),
        batch: zod_1.z.string().min(1, 'Batch is required'),
        cgpa: zod_1.z.coerce.number().min(0, 'CGPA cannot be negative').max(10, 'CGPA cannot exceed 10'),
        backlogs: zod_1.z.coerce.number().min(0, 'Backlogs cannot be negative').default(0),
    }).optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
