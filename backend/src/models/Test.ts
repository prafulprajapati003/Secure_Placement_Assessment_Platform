import { Schema, model, Document, Types } from 'mongoose';

export interface ITest extends Document {
  title: string;
  description?: string;
  placementDrive: Types.ObjectId;
  questions: Types.ObjectId[];
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  negativeMarking: number;
  shuffleQuestions: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestSchema = new Schema<ITest>({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  placementDrive: { type: Schema.Types.ObjectId, ref: 'PlacementDrive', required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question', default: [] }],
  duration: { type: Number, required: true, min: 1 },
  totalMarks: { type: Number, required: true, min: 1 },
  passingMarks: { type: Number, required: true, default: 0 },
  negativeMarking: { type: Number, required: true, default: 0, min: 0 },
  shuffleQuestions: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const Test = model<ITest>('Test', TestSchema);
export default Test;
