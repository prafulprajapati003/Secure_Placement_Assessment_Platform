"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
/**
 * Register a new user (Admin, Moderator, or Student)
 */
const register = async (req, res, next) => {
    try {
        const { name, email, password, role, profile } = req.body;
        // Check if email already exists
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ success: false, message: 'Email already registered.' });
            return;
        }
        // Hash the password
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        // Create the user
        const user = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
            role,
            profile: role === 'student' ? profile : undefined
        });
        // Generate JWT token
        const token = (0, jwt_1.generateToken)({ userId: user._id.toString(), role: user.role });
        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        // Remove password from returned user object
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            token,
            user: userResponse
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
/**
 * Login an existing user
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Find user and explicitly select password field (which is excluded by default)
        const user = await User_1.default.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
            return;
        }
        if (!user.isActive) {
            res.status(403).json({ success: false, message: 'User account is deactivated.' });
            return;
        }
        // Verify password
        const isMatch = await (0, bcrypt_1.comparePassword)(password, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
            return;
        }
        // Generate JWT token
        const token = (0, jwt_1.generateToken)({ userId: user._id.toString(), role: user.role });
        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        // Remove password from user object
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            user: userResponse
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
/**
 * Get profile of logged-in user
 */
const getMe = async (req, res, next) => {
    try {
        // req.user was attached by the authenticate middleware
        res.status(200).json({
            success: true,
            user: req.user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
