import { Logger, LoggerToFile } from '@/config/logger';
import { env } from '@/config/env';
import { exitHandler } from './exitHandler';
import { server } from '@/http-server';

/**
 * Custom uncaughtException handler. It will log the error, close the server and exit the process.
 * @param err - The error thrown
 * @param origin - The origin of the error
 */
export const uncaughtExceptionHandler = (
  err: Error,
  origin: NodeJS.UncaughtExceptionOrigin,
) => {
  const errorToLog = {
    message: 'Uncaught Exception thrown',
    error: {
      message: err.message,
      name: err.name,
      stack: err.stack,
    },
    origin,
  };

  LoggerToFile.error(errorToLog);

  if (env.NODE_ENV === 'development') {
    Logger.error(err);
  }

  exitHandler(server);
};
