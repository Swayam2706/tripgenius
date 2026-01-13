import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URL;

console.log('🔍 Testing MongoDB connection...');
console.log('Connection string (masked):', MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB connected successfully');
  process.exit(0);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('Full error:', err);
  process.exit(1);
});
