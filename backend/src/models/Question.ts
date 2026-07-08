import { Schema, model, Document } from 'mongoose';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface IQuestion extends Document {
  text: string;
  options: string[];
  correctOptionIndex: number;
  category: string;
  difficulty: QuestionDifficulty;
  marks: number;
  explanation?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  text: { type: String, required: true, trim: true },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(v: string[]) {
        return v.length >= 2;
      },
      message: 'A question must have at least 2 options.'
    }
  },
  correctOptionIndex: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  marks: { type: Number, required: true, default: 1, min: 1 },
  explanation: { type: String, trim: true }
}, {
  timestamps: true
});

export const Question = model<IQuestion>('Question', QuestionSchema);
export default Question;
