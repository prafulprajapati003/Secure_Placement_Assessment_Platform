"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const QuestionSchema = new mongoose_1.Schema({
    text: { type: String, required: true, trim: true },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
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
exports.Question = (0, mongoose_1.model)('Question', QuestionSchema);
exports.default = exports.Question;
