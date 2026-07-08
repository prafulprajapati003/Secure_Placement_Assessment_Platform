import { Schema, model, Document, Types } from 'mongoose';

export interface IResult extends Document {
  student: Types.ObjectId;
  test: Types.ObjectId;
  assignment: Types.ObjectId;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  percentage: number;
  isPassed: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ResultSchema = new Schema<IResult>({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true, unique: true },
  totalQuestions: { type: Number, required: true },
  attemptedQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  incorrectAnswers: { type: Number, required: true },
  score: { type: Number, required: true },
  percentage: { type: Number, required: true },
  isPassed: { type: Boolean, required: true },
  published: { type: Boolean, default: false }
}, {
  timestamps: true
});

export const Result = model<IResult>('Result', ResultSchema);
export default Result;
