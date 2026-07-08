"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = void 0;
const mongoose_1 = require("mongoose");
const ViolationSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    details: { type: String }
}, { _id: false });
const AssignmentSchema = new mongoose_1.Schema({
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    test: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Test', required: true },
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
exports.Assignment = (0, mongoose_1.model)('Assignment', AssignmentSchema);
exports.default = exports.Assignment;
