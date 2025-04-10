import mongoose from 'mongoose';
import 'dotenv/config';
const MONGO_URI = process.env.MONGO_DB_URI;
const DB_NAME = process.env.DB_NAME;

export const connectToDB = async () => {
  try {
    const connected = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
    if (connected) {
      console.log('Database connected successfully !');
    }
  } catch {
    console.log('MongoDB connection issue');
    process.exit(1);
  }
};
