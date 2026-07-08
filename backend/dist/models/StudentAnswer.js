"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAnswer = void 0;
const mongoose_1 = require("mongoose");
const StudentAnswerSchema = new mongoose_1.Schema({
    assignment: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    question: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: { type: Number, default: null },
    isMarkedForReview: { type: Boolean, default: false }
}, {
    timestamps: true
});
StudentAnswerSchema.index({ assignment: 1, question: 1 }, { unique: true });
exports.StudentAnswer = (0, mongoose_1.model)('StudentAnswer', StudentAnswerSchema);
exports.default = exports.StudentAnswer;
