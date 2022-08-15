import { Logger } from '@/config/logger';
import { SIGTERMHandler } from '@/utils/nodeHandlers/SIGTERMHandler';
import { app } from './app';
import { connectDB } from '@/config/connectDB';
import { env } from '@/config/env';
import { uncaughtExceptionHandler } from '@/utils/nodeHandlers/uncaughtExceptionHandler';
import { unhandledRejectionHandler } from '@/utils/nodeHandlers/unhandledRejectionHandler';

/**
 * The main function. Express http server.
 */
export const server = app.listen(env.PORT, () => {
  Logger.info(`HTTP Server listening on port ${env.PORT}`);

  if (env.NODE_ENV !== 'test') {
    connectDB();
  }
});

/**
 * Handle Node process termination.
 */

process.on('unhandledRejection', unhandledRejectionHandler);

process.on('uncaughtException', uncaughtExceptionHandler);

process.on('SIGTERM', SIGTERMHandler);
