"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const StudentProfileSchema = new mongoose_1.Schema({
    collageName: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    branch: { type: String, required: true, trim: true },
    section: { type: String, required: true, trim: true },
    batch: { type: String, required: true, trim: true },
    cgpa: { type: Number, required: true, min: 0, max: 10 },
    backlogs: { type: Number, required: true, min: 0, default: 0 }
}, { _id: false });
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'student', 'moderator'], default: 'student' },
    profile: { type: StudentProfileSchema, required: false },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
exports.default = exports.User;
