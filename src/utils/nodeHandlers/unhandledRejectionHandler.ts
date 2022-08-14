import { Logger, LoggerToFile } from '@/config/logger';
import { env } from '@/config/env';

/**
 * Custom unhandledRejection handler. It will log the error.
 * @param err - The error thrown
 * @param p - The promise that was rejected
 */
export const unhandledRejectionHandler = (
  err: Error | undefined,
  p: Promise<unknown>,
) => {
  const errorToLog = {
    message: 'Unhandled Rejection at Promise',
    promise: p,
    error: err,
  };

  if (err instanceof Error) {
    errorToLog.error = {
      message: err.message,
      name: err.name,
      stack: err.stack,
    };
  }

  LoggerToFile.error(errorToLog);

  if (env.NODE_ENV === 'development') {
    Logger.error(err);
  }
};
