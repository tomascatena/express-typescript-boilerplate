import { ApiError } from '@/utils/ApiError/ApiError';
import { Logger, LoggerToFile } from '@/config/logger';
import { NextFunction, Request, Response } from 'express';
import { env } from '@/config/config';
import httpStatus, { ReasonPhrases } from 'http-status-codes';

/**
 * Handles the error and logs it.
 * @param err - The error thrown
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 */
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  let { statusCode, message } = err;

  if (env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = ReasonPhrases.INTERNAL_SERVER_ERROR;
  }

  res.locals.errorMessage = err.message;

  if (env.NODE_ENV === 'development') {
    Logger.error(err);
  }

  LoggerToFile.error({
    message: err.message,
    name: err.name,
    isOperational: err.isOperational,
    stack: err.stack,
    statusCode: err.statusCode,
  });

  res.status(statusCode).json({
    statusCode,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
