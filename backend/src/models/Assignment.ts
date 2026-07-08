import { Schema, model, Document, Types } from 'mongoose';

export type AssignmentStatus = 'assigned' | 'started' | 'completed' | 'submitted_auto' | 'abandoned';

export interface IViolation {
  type: string;
  timestamp: Date;
  details?: string;
}

export interface IAssignment extends Document {
  student: Types.ObjectId;
  test: Types.ObjectId;
  status: AssignmentStatus;
  startTime?: Date;
  endTime?: Date;
  warningsCount: number;
  violations: IViolation[];
  createdAt: Date;
  updatedAt: Date;
}

const ViolationSchema = new Schema<IViolation>({
  type: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  details: { type: String }
}, { _id: false });

const AssignmentSchema = new Schema<IAssignment>({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  status: {
    type: String,
    enum: ['assigned', 'started', 'completed', 'submitted_auto', 'abandoned'],
    default: 'assigned'
  },
  startTime: { type: Date },
  endTime: { type: Date },
  warningsCount: { type: Number, default: 0, min: 0 },
  violations: { type: [ViolationSchema], default: [] }
}, {
  timestamps: true
});

AssignmentSchema.index({ student: 1, test: 1 }, { unique: true });

export const Assignment = model<IAssignment>('Assignment', AssignmentSchema);
export default Assignment;
