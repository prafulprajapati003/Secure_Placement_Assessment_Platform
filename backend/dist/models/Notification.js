"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
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
exports.Notification = (0, mongoose_1.model)('Notification', NotificationSchema);
exports.default = exports.Notification;
