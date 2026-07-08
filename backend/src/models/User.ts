import { Schema, model, Document } from 'mongoose';

export type UserRole = 'admin' | 'student' | 'moderator';

export interface IStudentProfile {
  collageName: string;
  rollNumber: string;
  course: string;
  branch: string;
  section: string;
  batch: string;
  cgpa: number;
  backlogs: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  profile?: IStudentProfile;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentProfileSchema = new Schema<IStudentProfile>({
  collageName:{ type: String, required: true, trim: true },
  rollNumber: { type: String, required: true, trim: true },
  course: { type: String, required: true, trim: true },
  branch: { type: String, required: true, trim: true },
  section: { type: String, required: true, trim: true },
  batch: { type: String, required: true, trim: true },
  cgpa: { type: Number, required: true, min: 0, max: 10 },
  backlogs: { type: Number, required: true, min: 0, default: 0 }
}, { _id: false });

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'student', 'moderator'], default: 'student' },
  profile: { type: StudentProfileSchema, required: false },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const User = model<IUser>('User', UserSchema);
export default User;
