"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const env_1 = require("../config/env");
const errorHandler = (err, req, res, next) => {
    console.error('❌ Server Error:', err);
    const statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate field value entered for: ${field}. Please use another value.`;
        res.status(400).json({
            success: false,
            message
        });
        return;
    }
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => val.message);
        res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: messages
        });
        return;
    }
    // Handle Mongoose CastError (e.g. invalid ObjectId)
    if (err.name === 'CastError') {
        res.status(400).json({
            success: false,
            message: `Resource not found with id of ${err.value}`
        });
        return;
    }
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            success: false,
            message: 'Invalid authorization token.'
        });
        return;
    }
    if (err.name === 'TokenExpiredError') {
        res.status(401).json({
            success: false,
            message: 'Authorization token has expired.'
        });
        return;
    }
    res.status(statusCode).json({
        success: false,
        message,
        stack: env_1.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
exports.errorHandler = errorHandler;
