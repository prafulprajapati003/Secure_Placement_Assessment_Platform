"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const startServer = async () => {
    try {
        // Connect to database
        await (0, db_1.connectDB)();
        // Start Express server
        const server = app_1.default.listen(env_1.env.PORT, () => {
            console.log(`🚀 Server running in ${env_1.env.NODE_ENV} mode on port ${env_1.env.PORT}`);
        });
        // Handle clean shutdown
        const shutdown = () => {
            console.log('📡 Shutting down server gracefully...');
            server.close(() => {
                console.log('📡 Server closed.');
                process.exit(0);
            });
        };
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    }
    catch (error) {
        console.error('❌ Server startup error:', error);
        process.exit(1);
    }
};
startServer();
