import {
  Logger,
  LoggerToFile,
} from './logger';
import { env } from './env';
import mongoose from 'mongoose';

const DB_URI = env.NODE_ENV === 'test' ? env.MONGODB_TEST_URI : env.MONGODB_URI;

/**
 * @config
 * @description - Connect to mongoDB using mongoose.
 */
export const connectDB = async () => {
  Logger.info('Connecting to mongoDB');

  try {
    const conn = await mongoose.connect(DB_URI);

    Logger.info('Connected to mongoDB:');
    Logger.info(`   - URL: ${conn.connection.host}:${conn.connection.port}`);
    Logger.info(`   - Database Name: ${conn.connection.db.databaseName}`);
  } catch (error) {
    if (error instanceof Error || error instanceof mongoose.Error) {
      Logger.error(`Something went wrong when connecting to mongoDB: ${error.message}`);

      LoggerToFile.error({
        name: error.name,
        message: error.message,
        stack: error.stack,
      });

      process.exit(1);
    }
  }
};
