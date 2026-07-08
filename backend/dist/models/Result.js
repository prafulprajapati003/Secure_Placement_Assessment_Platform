"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const mongoose_1 = require("mongoose");
const ResultSchema = new mongoose_1.Schema({
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    test: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Test', required: true },
    assignment: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Assignment', required: true, unique: true },
    totalQuestions: { type: Number, required: true },
    attemptedQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    incorrectAnswers: { type: Number, required: true },
    score: { type: Number, required: true },
    percentage: { type: Number, required: true },
    isPassed: { type: Boolean, required: true },
    published: { type: Boolean, default: false }
}, {
    timestamps: true
});
exports.Result = (0, mongoose_1.model)('Result', ResultSchema);
exports.default = exports.Result;
