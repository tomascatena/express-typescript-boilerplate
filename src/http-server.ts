import { Logger } from '@/config/logger';
import { SIGTERMHandler } from '@/utils/nodeHandlers/SIGTERMHandler';
import { app } from './app';
import { connectDB } from '@/config/connectDB';
import { env } from '@/config/env';
import { uncaughtExceptionHandler } from '@/utils/nodeHandlers/uncaughtExceptionHandler';
import { unhandledRejectionHandler } from '@/utils/nodeHandlers/unhandledRejectionHandler';

const main = async () => {
  Logger.info(`Starting ${env.APP_NAME} on port ${env.PORT}`);

  await connectDB();

  Logger.info(`${env.APP_NAME} is running on port ${env.PORT}`);
};

export const server = app.listen(env.PORT, main);

process.on('unhandledRejection', unhandledRejectionHandler);
process.on('uncaughtException', uncaughtExceptionHandler);
process.on('SIGTERM', SIGTERMHandler);
