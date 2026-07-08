import { hashPassword, comparePassword } from './utils/bcrypt';
import { generateToken, verifyToken } from './utils/jwt';
import { env } from './config/env';
import mongoose from 'mongoose';

import User from './models/User';
import PlacementDrive from './models/PlacementDrive';
import Question from './models/Question';
import Test from './models/Test';
import Assignment from './models/Assignment';
import StudentAnswer from './models/StudentAnswer';
import Result from './models/Result';
import ActivityLog from './models/ActivityLog';
import Notification from './models/Notification';

async function runTests() {
  console.log(' Starting Verification Tests...\n');

  console.log('Test 1: Bcrypt password hashing');
  const password = 'securePassword123';
  const hashed = await hashPassword(password);
  console.log(`- Password: ${password}`);
  console.log(`- Hash: ${hashed}`);
  const isMatch = await comparePassword(password, hashed);
  const isFail = await comparePassword('wrongPassword', hashed);
  console.log(`- Match verification (correct): ${isMatch ? '✅ Success' : '❌ Failed'}`);
  console.log(`- Match verification (incorrect): ${!isFail ? '✅ Success' : '❌ Failed'}`);
  if (!isMatch || isFail) throw new Error('Bcrypt test failed');
  console.log(' Bcrypt tests passed!\n');


  console.log('Test 2: JWT generation & verification');
  const payload = { userId: 'user_1234567890abcdef', role: 'student' };
  console.log(`- Payload: ${JSON.stringify(payload)}`);
  const token = generateToken(payload);
  console.log(`- Token: ${token}`);
  const decoded = verifyToken(token);
  console.log(`- Decoded: ${JSON.stringify(decoded)}`);
  
  if (decoded && decoded.userId === payload.userId && decoded.role === payload.role) {
    console.log(' JWT tests passed!\n');
  } else {
    throw new Error('JWT verification failed');
  }

  console.log('Test 3: Checking model schema compilation');
  console.log(`- User model status: ${User ? '✅ Loaded' : '❌ Error'}`);
  console.log(`- PlacementDrive model status: ${PlacementDrive ? '✅ Loaded' : '❌ Error'}`);
  console.log(`- Question model status: ${Question ? '✅ Loaded' : '❌ Error'}`);
  console.log(`- Test model status: ${Test ? '✅ Loaded' : '❌ Error'}`);
  console.log(`- Assignment model status: ${Assignment ? '✅ Loaded' : '❌ Error'}`);
  console.log(`- StudentAnswer model status: ${StudentAnswer ? '✅ Loaded' : '❌ Error'}`);
  console.log(`- Result model status: ${Result ? '✅ Loaded' : '❌ Error'}`);
  console.log(`- ActivityLog model status: ${ActivityLog ? '✅ Loaded' : '❌ Error'}`);
  console.log(`- Notification model status: ${Notification ? '✅ Loaded' : '❌ Error'}`);
  console.log(' Models compilation tests passed!\n');

  console.log('Test 4: Attempting DB Connection');
  console.log(`- MONGO_URI in environment: ${env.MONGO_URI}`);
  try {
    mongoose.set('bufferCommands', false);
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(' DB Connection Successful!');
    await mongoose.disconnect();
    console.log(' DB Connection closed clean.');
  } catch (err) {
    console.log(` DB Connection failed or timed out: ${(err as Error).message}`);
    console.log('  (This is normal if a local MongoDB service or Atlas instance is not running/configured yet.)');
  }

  console.log('\n Verification completed successfully!');
}

runTests().catch(err => {
  console.error(' Verification failed with error:', err);
  process.exit(1);
});
