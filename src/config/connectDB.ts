import {
  Logger,
  LoggerToFile,
} from './logger';
import { env } from './env';
import mongoose from 'mongoose';

const logError = (err: Error | mongoose.Error) => {
  Logger.error(`Something went wrong when connecting to mongoDB: ${err.message}`);

  LoggerToFile.error({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};

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
    console.log(error);
    if (error instanceof Error || error instanceof mongoose.Error) {
      logError(error);
      process.exit(1);
    }
  }
};
