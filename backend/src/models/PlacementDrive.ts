import { Schema, model, Document, Types } from 'mongoose';

export type DriveStatus = 'upcoming' | 'ongoing' | 'completed';

export interface IEligibility {
  cgpa: number;
  backlogs: number;
  branches: string[];
}

export interface IPlacementDrive extends Document {
  title: string;
  description: string;
  companyName: string;
  eligibility: IEligibility;
  scheduledDate: Date;
  duration: number;
  status: DriveStatus;
  students: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const EligibilitySchema = new Schema<IEligibility>({
  cgpa: { type: Number, required: true, default: 0 },
  backlogs: { type: Number, required: true, default: 0 },
  branches: { type: [String], required: true, default: [] }
}, { _id: false });

const PlacementDriveSchema = new Schema<IPlacementDrive>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  companyName: { type: String, required: true, trim: true },
  eligibility: { type: EligibilitySchema, required: true },
  scheduledDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  students: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
}, {
  timestamps: true
});

export const PlacementDrive = model<IPlacementDrive>('PlacementDrive', PlacementDriveSchema);
export default PlacementDrive;
