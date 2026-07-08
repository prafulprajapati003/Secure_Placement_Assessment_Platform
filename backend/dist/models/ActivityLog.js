"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLog = void 0;
const mongoose_1 = require("mongoose");
const ActivityLogSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true, index: true },
    details: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now, required: true }
});
exports.ActivityLog = (0, mongoose_1.model)('ActivityLog', ActivityLogSchema);
exports.default = exports.ActivityLog;
