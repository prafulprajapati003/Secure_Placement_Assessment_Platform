"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    try {
        let token = '';
        // Check for authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        // Fallback: Check cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
            return;
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            res.status(401).json({ success: false, message: 'Invalid or expired token.' });
            return;
        }
        const user = await User_1.default.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ success: false, message: 'User matching this token no longer exists.' });
            return;
        }
        if (!user.isActive) {
            res.status(403).json({ success: false, message: 'User account is deactivated.' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
    }
};
exports.authenticate = authenticate;
