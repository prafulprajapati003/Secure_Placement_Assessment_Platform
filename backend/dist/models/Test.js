"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const mongoose_1 = require("mongoose");
const TestSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    placementDrive: { type: mongoose_1.Schema.Types.ObjectId, ref: 'PlacementDrive', required: true },
    questions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Question', default: [] }],
    duration: { type: Number, required: true, min: 1 },
    totalMarks: { type: Number, required: true, min: 1 },
    passingMarks: { type: Number, required: true, default: 0 },
    negativeMarking: { type: Number, required: true, default: 0, min: 0 },
    shuffleQuestions: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});
exports.Test = (0, mongoose_1.model)('Test', TestSchema);
exports.default = exports.Test;
