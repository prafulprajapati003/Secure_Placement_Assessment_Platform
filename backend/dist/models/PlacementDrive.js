"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacementDrive = void 0;
const mongoose_1 = require("mongoose");
const EligibilitySchema = new mongoose_1.Schema({
    cgpa: { type: Number, required: true, default: 0 },
    backlogs: { type: Number, required: true, default: 0 },
    branches: { type: [String], required: true, default: [] }
}, { _id: false });
const PlacementDriveSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    companyName: { type: String, required: true, trim: true },
    eligibility: { type: EligibilitySchema, required: true },
    scheduledDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: [] }]
}, {
    timestamps: true
});
exports.PlacementDrive = (0, mongoose_1.model)('PlacementDrive', PlacementDriveSchema);
exports.default = exports.PlacementDrive;
