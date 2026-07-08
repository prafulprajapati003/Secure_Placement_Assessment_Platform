import { Schema, model, Document, Types } from 'mongoose';

export interface IActivityLog extends Document {
  user?: Types.ObjectId;
  action: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true, index: true },
  details: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now, required: true }
});

export const ActivityLog = model<IActivityLog>('ActivityLog', ActivityLogSchema);
export default ActivityLog;
