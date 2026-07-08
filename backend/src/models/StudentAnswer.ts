import { Schema, model, Document, Types } from 'mongoose';

export interface IStudentAnswer extends Document {
  assignment: Types.ObjectId;
  question: Types.ObjectId;
  selectedOption?: number;
  isMarkedForReview: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentAnswerSchema = new Schema<IStudentAnswer>({
  assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOption: { type: Number, default: null },
  isMarkedForReview: { type: Boolean, default: false }
}, {
  timestamps: true
});

StudentAnswerSchema.index({ assignment: 1, question: 1 }, { unique: true });

export const StudentAnswer = model<IStudentAnswer>('StudentAnswer', StudentAnswerSchema);
export default StudentAnswer;
