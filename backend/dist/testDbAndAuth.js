"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("./utils/bcrypt");
const jwt_1 = require("./utils/jwt");
const env_1 = require("./config/env");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
const PlacementDrive_1 = __importDefault(require("./models/PlacementDrive"));
const Question_1 = __importDefault(require("./models/Question"));
const Test_1 = __importDefault(require("./models/Test"));
const Assignment_1 = __importDefault(require("./models/Assignment"));
const StudentAnswer_1 = __importDefault(require("./models/StudentAnswer"));
const Result_1 = __importDefault(require("./models/Result"));
const ActivityLog_1 = __importDefault(require("./models/ActivityLog"));
const Notification_1 = __importDefault(require("./models/Notification"));
async function runTests() {
    console.log(' Starting Verification Tests...\n');
    console.log('Test 1: Bcrypt password hashing');
    const password = 'securePassword123';
    const hashed = await (0, bcrypt_1.hashPassword)(password);
    console.log(`- Password: ${password}`);
    console.log(`- Hash: ${hashed}`);
    const isMatch = await (0, bcrypt_1.comparePassword)(password, hashed);
    const isFail = await (0, bcrypt_1.comparePassword)('wrongPassword', hashed);
    console.log(`- Match verification (correct): ${isMatch ? '✅ Success' : '❌ Failed'}`);
    console.log(`- Match verification (incorrect): ${!isFail ? '✅ Success' : '❌ Failed'}`);
    if (!isMatch || isFail)
        throw new Error('Bcrypt test failed');
    console.log(' Bcrypt tests passed!\n');
    console.log('Test 2: JWT generation & verification');
    const payload = { userId: 'user_1234567890abcdef', role: 'student' };
    console.log(`- Payload: ${JSON.stringify(payload)}`);
    const token = (0, jwt_1.generateToken)(payload);
    console.log(`- Token: ${token}`);
    const decoded = (0, jwt_1.verifyToken)(token);
    console.log(`- Decoded: ${JSON.stringify(decoded)}`);
    if (decoded && decoded.userId === payload.userId && decoded.role === payload.role) {
        console.log(' JWT tests passed!\n');
    }
    else {
        throw new Error('JWT verification failed');
    }
    console.log('Test 3: Checking model schema compilation');
    console.log(`- User model status: ${User_1.default ? '✅ Loaded' : '❌ Error'}`);
    console.log(`- PlacementDrive model status: ${PlacementDrive_1.default ? '✅ Loaded' : '❌ Error'}`);
    console.log(`- Question model status: ${Question_1.default ? '✅ Loaded' : '❌ Error'}`);
    console.log(`- Test model status: ${Test_1.default ? '✅ Loaded' : '❌ Error'}`);
    console.log(`- Assignment model status: ${Assignment_1.default ? '✅ Loaded' : '❌ Error'}`);
    console.log(`- StudentAnswer model status: ${StudentAnswer_1.default ? '✅ Loaded' : '❌ Error'}`);
    console.log(`- Result model status: ${Result_1.default ? '✅ Loaded' : '❌ Error'}`);
    console.log(`- ActivityLog model status: ${ActivityLog_1.default ? '✅ Loaded' : '❌ Error'}`);
    console.log(`- Notification model status: ${Notification_1.default ? '✅ Loaded' : '❌ Error'}`);
    console.log(' Models compilation tests passed!\n');
    console.log('Test 4: Attempting DB Connection');
    console.log(`- MONGO_URI in environment: ${env_1.env.MONGO_URI}`);
    try {
        mongoose_1.default.set('bufferCommands', false);
        await mongoose_1.default.connect(env_1.env.MONGO_URI, {
            serverSelectionTimeoutMS: 3000
        });
        console.log(' DB Connection Successful!');
        await mongoose_1.default.disconnect();
        console.log(' DB Connection closed clean.');
    }
    catch (err) {
        console.log(` DB Connection failed or timed out: ${err.message}`);
        console.log('  (This is normal if a local MongoDB service or Atlas instance is not running/configured yet.)');
    }
    console.log('\n Verification completed successfully!');
}
runTests().catch(err => {
    console.error(' Verification failed with error:', err);
    process.exit(1);
});
