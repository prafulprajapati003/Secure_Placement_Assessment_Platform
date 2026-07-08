import { Schema, model, Document, Types } from 'mongoose';

export type NotificationType = 'test_assigned' | 'result_published' | 'info';

export interface INotification extends Document {
  user: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['test_assigned', 'result_published', 'info'],
    default: 'info'
  },
  read: { type: Boolean, default: false }
}, {
  timestamps: true
});

export const Notification = model<INotification>('Notification', NotificationSchema);
export default Notification;
